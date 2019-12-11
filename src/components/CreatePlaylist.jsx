import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import
{
	createBranchPlaylist,
	getPlaylistById,
	updatePlaylist
} from "../api/playlists";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import DatetimeRangePicker from "react-datetime-range-picker";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import IconButton from "@material-ui/core/IconButton";
import "./css/createPlaylist.css";
import { uploadFile } from "../api/files";
import { cancel } from "../api/files";
import { TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import
{
	convertSeconds,
	formatTime,
	formatBytes,
	isEmpty,
	convertSecondsIntoString
} from "./Utils";
import { withRouter } from "react-router";
import { isEqual, cloneDeep } from "lodash";
import Modal from "@material-ui/core/Modal";
import fadeIn from "./FadeIn";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import Loader from "./Loader";
import Confirmation from "./ConfirmAlert/Confirm";
import AlertMe from "./ConfirmAlert/AlertMe";
import { ChromePicker } from "react-color";

const CreatePlaylist = props =>
{
	const {
		branchId,
		setPlaylists,
		branchScreens,
		disabledDates,
		playlistId
	} = props;
	const [name, setName] = useState("");
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [selectedFile, setSelectedFile] = useState(null);
	const [disableCreate, setDisableCreate] = useState(true);
	const [enableUpload, setEnableUpload] = useState(false);
	const [uploadFileItem, setUploadFileItem] = useState(null);
	const [screen, setScreen] = useState([]);
	const [uploadPercentage, setUploadPercentage] = useState();
	const [day, setDay] = useState("");
	const [hour, setHour] = useState("");
	const [minute, setMinute] = useState("");
	const [second, setSecond] = useState("");
	const [showTime, setShowTime] = useState(0);
	const [order, setOrder] = useState({
		order1: [],
		order2: [],
		order3: []
	});
	const [files, setFiles] = useState([]);
	const [isInvalidDate, setIsInvalidDate] = useState(true);
	const [check, setCheck] = useState({
		checked1: false,
		checked2: false,
		checked3: false
	});
	const [maxOrder, setMaxOrder] = useState(1);
	const [orderTemp, setOrderTemp] = useState(1);
	const [playlist, setPlaylist] = useState();
	const [changed, setChanged] = useState(false);
	const [currency, setCurrency] = useState(false);
	const [ticker, setTicker] = useState({ text: "", color: "", fontSize: "16" });
	const [multiply, setMultiply] = useState(1);
	const [duration, setDuration] = useState(0);
	const [open, setOpen] = React.useState(false);

	const textRef = useRef("");
	const dates = useRef(null);

	useEffect(() =>
	{
		if (files.length)
		{
			let tempOrder = {
				order1: [],
				order2: [],
				order3: []
			};
			for (let file of files)
			{
				file.screen.forEach(screen =>
				{
					let arr = tempOrder[`order${screen}`];
					arr.push(file.order);

					setOrder({ ...tempOrder, [`order${screen}`]: [...arr] });
				});
			}
		}
	}, [files]);

	useEffect(() =>
	{
		if (playlistId)
		{
			setDuration(0);
			setShowTime(0);
			setChanged(false);
			setScreen([]);
			setDay("");
			setHour("");
			setMinute("");
			setSecond("");
			setUploadFileItem(null);
			setSelectedFile(null);
			resetForm();
			setCheck({
				checked1: false,
				checked2: false,
				checked3: false
			});

			setOrder({
				order1: [],
				order2: [],
				order3: []
			});
			getPlaylistById(branchId, playlistId, setPlaylist, setFiles, () => props.history.push(`/branches/${branchId}/`));
		}
	}, [branchId, playlistId, props.history]);

	useEffect(() =>
	{
		if (playlist && !isEmpty(playlist))
		{
			let filterDates = cloneDeep(disabledDates);

			for (let i in filterDates)
			{
				if (filterDates[i].id === playlistId)
				{
					filterDates.splice(i, 1);
				}
			}
			dates.current = cloneDeep(filterDates);
			setName(playlist.name);
			setStartDate(new Date(playlist.startDate).valueOf());
			setEndDate(new Date(playlist.endDate).valueOf());
			setCurrency(playlist.currency);
			setTicker(playlist.ticker);
			setIsInvalidDate(false);
		}
	}, [disabledDates, playlist, playlistId]);

	useEffect(() =>
	{
		let max = 0;
		screen.forEach(s =>
		{
			let arr = order[`order${s}`];
			let temp = Math.max(...arr);
			max = max > temp ? max : temp;
		});
		setMaxOrder(max + 1);
		setOrderTemp(max + 1);
	}, [order, screen]);

	useEffect(() =>
	{
		const seconds =
			(second ? second : 0) +
			(minute ? minute : 0) * 60 +
			(hour ? hour : 0) * 60 * 60 +
			(day ? day : 0) * 24 * 60 * 60;
		setShowTime(seconds);
	}, [day, hour, minute, second]);

	useEffect(() =>
	{
		if (playlist)
		{
			if (changed)
			{
				setDisableCreate(false);
			} else
			{
				setDisableCreate(true);
			}
		} else if (files.length > 0 && name && startDate && endDate && !isInvalidDate)
		{
			setDisableCreate(false);
		} else
		{
			setDisableCreate(true);
		}
	}, [files, name, startDate, endDate, isInvalidDate, changed, playlist]);

	useEffect(() =>
	{
		if (showTime && order && screen.length > 0 && selectedFile && uploadFileItem)
		{
			setEnableUpload(true);
		} else
		{
			setEnableUpload(false);
		}
	}, [uploadFileItem, showTime, order, screen, selectedFile]);

	useEffect(() =>
	{
		if (duration)
		{
			setShowTimeByMultiply(multiply * duration);
		}
	}, [multiply, duration]);

	const setShowTimeByMultiply = d =>
	{
		const obj = convertSeconds(d);
		const { days, hrs, mnts, sec } = obj;
		setDay(days);
		setHour(hrs);
		setMinute(mnts);
		setSecond(sec);
	};
	const handleMetadata = e =>
	{
		const d = Number(e.currentTarget.duration).toFixed(2);
		setDuration(Number(d));
		setShowTimeByMultiply(Number(d));
	};
	const createHandleClick = () =>
	{
		if (checkSumEquality())
		{
			const playlistObj = {
				name,
				endDate,
				startDate,
				currency,
				ticker,
				files: JSON.stringify([...files])
			};
			if (playlist)
			{
				updatePlaylist(
					playlistId,
					branchId,
					playlistObj,
					setPlaylists,
					toBranchPage
				);
				setChanged(false);
			} else
			{
				createBranchPlaylist(branchId, playlistObj, setPlaylists, toBranchPage);
				setName("");
				setCurrency(false);
				setTicker({ text: "", color: "", fontSize: "16" });
				setStartDate();
				setEndDate();
				setFiles([]);
			}
		} else
		{
			AlertMe("check files showTime summarize equality for every screen");
		}
	};
	const handleChangeName = event =>
	{
		setName(event.target.value);
		setChanged(true);
	};
	const toBranchPage = () =>
	{
		props.history.push(`/branches/${branchId}/`);
	};
	const handleChangeCurrency = event =>
	{
		setCurrency(event.target.checked);
		setChanged(true);
	};
	const handleSaveTicker = event =>
	{
		const val = textRef.current.value;
		if (val.trim().length)
		{
			const tickerMutate = cloneDeep(ticker);
			tickerMutate.text = val;
			setTicker(tickerMutate);
			AlertMe("ticker saved");
		} else
		{
			setTicker({ text: "", color: "", fontSize: "16" });
		}
		setChanged(true);
		handleClose();
	};
	const dateTimeRangePickerChange = value =>
	{
		
		const start = new Date(value.start).valueOf();
		const end = new Date(value.end).valueOf();

		let minDate = -Infinity;
		let maxDate = Infinity;
		let d = dates && dates.current ? dates.current : disabledDates;
		for (let item of d)
		{
			const startRange = new Date(item.startDate).valueOf();
			const endRange = new Date(item.endDate).valueOf();
			if (start < startRange || start > endRange)
			{
				if (minDate === -Infinity)
				{
					minDate = start > endRange ? endRange : minDate;
				}
				if (maxDate === Infinity)
				{
					maxDate = start < startRange ? startRange : maxDate;
				}
			} else if (start >= startRange && start <= endRange)
			{
				setIsInvalidDate(true);
				AlertMe(`This date is in used!!! ${new Date(item.startDate).toLocaleString()} - ${new Date(item.endDate).toLocaleString()} try another date.`);
				return;
			}
		}
		if (start && (start > minDate) && (start < maxDate))
		{
			if (end && (end > minDate) && (end < maxDate))
			{
				setIsInvalidDate(false);
				setChanged(true);
				setEndDate(end);
			}
			else {
				AlertMe(`set valid end date`);
			}
			setStartDate(start);
			return;
		}
		setIsInvalidDate(true);
		AlertMe(`This date is in used!!! try less than ${new Date(maxDate).toLocaleString()} .`);
	};
	const handleChangeDay = event =>
	{
		let val = event.target.value ? Number(event.target.value) : "";
		if (!isNaN(val) && (val <= 365) && (val >= 0))
		{
			setDay(val);
		} else
		{
			setDay(0);
		}
	};
	const handleChangeHour = event =>
	{
		let val = event.target.value ? Number(event.target.value) : "";
		if (!isNaN(val) && val <= 23 && val >= 0)
		{
			setHour(val);
		} else
		{
			setHour(0);
		}
	};
	const handleChangeMinute = event =>
	{
		let val = event.target.value ? Number(event.target.value) : "";
		if (!isNaN(val) && val <= 59 && val >= 0)
		{
			setMinute(val);
		} else setMinute(0);
	};
	const handleChangeSecond = event =>
	{
		let val = event.target.value ? Number(event.target.value) : "";
		if (!isNaN(val) && val <= 59 && val >= 0)
		{
			setSecond(val);
		} else setSecond(0);
	};
	const selectFileHandler = event =>
	{
		setSelectedFile(event.target.files[0]);
	};
	const deleteFile = (file, i) =>
	{
		Confirmation("Are you sure to delete the file?", () =>
		{
			let tempScreen = files[i].screen;
			let tempOrder = files[i].order;
			tempScreen.forEach(scr =>
			{
				let arr = order[`order${scr}`];
				for (let i = 0; i < arr.length; i++)
				{
					if (arr[i] === tempOrder)
					{
						arr.splice(i, 1);
					}
				}
				setOrder({ ...order, [`order${scr}`]: [...arr] });
			});
			const filesClone = cloneDeep(files);
			for (let j = 0; j < filesClone.length; j++)
			{
				if (isEqual(filesClone[j], file) && j === i)
				{
					filesClone.splice(j, 1);
				}
			}
			setFiles(filesClone);
			setChanged(true);
		}, []);
	};
	const resetForm = () =>
	{
		const form = document.getElementById("form");
		if (form)
		{
			form.reset();
		}
		if (cancel)
		{
			cancel();
		}
		setUploadPercentage("");
		setSelectedFile(null);
		setMultiply(1);
		setUploadFileItem(null);
	};
	const fileUploadHandler = event =>
	{
		event.preventDefault();
		const formData = new FormData();
		formData.append("file", selectedFile);
		uploadFile(formData, setUploadFileItem, setUploadPercentage);
	};
	const checkBoxHandleChange = name => event =>
	{
		if (
			(check.checked1 && !check.checked2 && name === "checked3") ||
			(check.checked3 && !check.checked2 && name === "checked1")
		)
		{
			return;
		}
		if (
			check.checked1 &&
			check.checked2 &&
			check.checked3 &&
			name === "checked2"
		)
		{
			setCheck({
				checked1: false,
				checked2: false,
				checked3: false
			});
			setScreen([]);
			return;
		}
		let screenArr = screen;
		setCheck({ ...check, [name]: event.target.checked });
		if (screenArr.indexOf(parseInt(name.split("")[name.length - 1])) === -1)
		{
			setScreen([...screenArr, parseInt(name.split("")[name.length - 1])].sort((a, b) => a - b));
		} 
		else if ( screenArr.indexOf(parseInt(name.split("")[name.length - 1])) !== -1)
		{
			screenArr.splice(screenArr.indexOf(parseInt(name.split("")[name.length - 1])),1);
			setScreen([...screenArr].sort((a, b) => a - b));
		}
	};
	const handleChangeOrder = event =>
	{
		setOrderTemp(event.target.value);
	};
	const handleMultiply = event =>
	{
		const val = event.target.value;
		if (val >= 1)
		{
			setMultiply(val);
		} else setMultiply(1);
	};
	const ordering = (screen, files, tempOrder) =>
	{
		files.forEach((file, i) =>
		{
			if (file.screen.indexOf(screen) !== -1)
			{
				let o = file.order;
				if (file.order === tempOrder)
				{
					o++;
					file.screen.forEach(scr =>
					{
						ordering(scr, files, o);
					});
				}
				let arr = order[`order${screen}`];
				arr.push(o);
				setOrder({ ...order, [`order${screen}`]: [...arr] });
				files[i] = { ...file, order: o };
			}
		});
	};
	const createFile = event =>
	{
		if (uploadFileItem)
		{
			screen.forEach(s =>
			{
				let arr = order[`order${s}`];
				arr.push(orderTemp);
				setOrder({ ...order, [`order${s}`]: [...arr] });
			});

			let tempFiles = files;
			screen.forEach(s =>
			{
				ordering(s, tempFiles, orderTemp);
			});

			setFiles(
				[
					...tempFiles,
					{
						showTime,
						order: orderTemp,
						screen,
						name: uploadFileItem.filename,
						type: uploadFileItem.mimetype,
						url: uploadFileItem.path
					}
				].sort((a, b) => a.order - b.order)
			);
		}
		resetPlaylist();
		setChanged(true);
	};

	const resetPlaylist = () =>
	{
		setDuration(0);
		setShowTime(0);
		setChanged(false);
		setScreen([]);
		setDay("");
		setHour("");
		setMinute("");
		setSecond("");
		setUploadFileItem(null);
		setSelectedFile(null);
		resetForm();
		setCheck({
			checked1: false,
			checked2: false,
			checked3: false
		});
	};
	const copyHandleClick = p =>
	{
		const { name, currency, ticker, startDate, endDate } = p;
		const obj = {
			name,
			endDate: new Date(endDate).valueOf(),
			startDate: new Date(startDate).valueOf(),
			currency,
			ticker,
			files: [...files]
		};
		localStorage.setItem("copiedPlaylist", JSON.stringify(obj));
		localStorage.setItem("screens", branchScreens);
		AlertMe(`Playlist "${name}" copied `);
	};
	const checkSumEquality = () =>
	{
		const arr = [];
		for (let scr = 0; scr < branchScreens; scr++)
		{
			arr[scr] = 0;
		}
		files.forEach(f =>
		{
			for (let scr = 0; scr < arr.length; scr++)
			{
				if (f.screen.indexOf(scr + 1) !== -1)
				{
					arr[scr] += f.showTime;
				}
			}
		});
		for (let k = 0; k < arr.length; k++)
		{
			if (arr[k] !== arr[arr.length - 1 - k])
			{
				return false;
			}
		}
		return true;
	};
	const handleOpen = () =>
	{
		setOpen(true);
	};
	const handleClose = () =>
	{
		setOpen(false);
	};

	const handleChangeTickerColor = (color) => 
	{
		const tickerMutate = cloneDeep(ticker);
		tickerMutate.color = color.rgb;
		setTicker(tickerMutate);
	};

	const handleChangeFontSize = (e) => 
	{
		const tickerMutate = cloneDeep(ticker);
		tickerMutate.fontSize = e.target.value;
		setTicker(tickerMutate);
	};

	const strDay = formatTime("d", day);
	const strHour = formatTime("h", hour);
	const strMinute = formatTime("m", minute);
	const strSecond = formatTime("s", second);

	return branchId ? (
		<div className="createPlaylist">
			<div className="head">
				<span>{playlist ? "Update" : "Create Playlist"}</span>
				{playlist && (
					<span className="copyStyle">
						<IconButton
							aria-label="Copy"
							onClick={() => copyHandleClick(playlist)}
							title="Copy"
							style={{ padding: "3px" }}
						>
							<FileCopyIcon fontSize="small" />
						</IconButton>
					</span>
				)}
				<Link to={`/branches/${branchId}/`}>
					<i className="close" />
				</Link>
			</div>
			<div className="createPlaylistBody">
				<div className="playlistTabsContainer">
					<div>
						<div className="playlistCreateItemCont">
							<Input
								className="backgroundFFF"
								value={name}
								title={name}
								onChange={handleChangeName}
								placeholder="Name"
							/>

							<DatetimeRangePicker
								inputProps={{
									className: "margin05",
									placeholder: "pick date and time"
								}}
								timeFormat={"HH:mm"}
								startDate={startDate ? new Date(startDate) : ""}
								endDate={endDate ? new Date(endDate) : ""}
								onChange={dateTimeRangePickerChange}
								className="centerByFlex dateRangeClass"
							/>
							<label className="currencyTickerStyle">
								<span>Currency</span>
								<input
									type="checkbox"
									name="currency"
									checked={currency}
									className="margin05"
									onChange={handleChangeCurrency}
								/>
							</label>
							<label className="currencyTickerStyle">
								<Button
									onClick={handleOpen}
									size="small"
									style={{
										border: "1px solid #fff",
										padding: 0,
										height: "22px",
										marginLeft: "5px"
									}}
								>
									Ticker
								</Button>
							</label>
						</div>
					</div>
					<div style={{ height: "100%",display: "flex" }}>
						<div className="createFileCont">
							<span className="head">Create File</span>

							<div className="playlistCreateItemCont spaceBetWeen">
								<span className="playlistTabHead">Screen:</span>
								<div className="backgroundFFF" style={{ padding: "0.5rem" }}>
									{[1, 2, 3].map(option =>
										option <= branchScreens ? (
											<span key={option}>
												<label>{option}</label>
												<input
													className="margin05 padding05"
													type="checkbox"
													checked={
														option === 1
															? check.checked1
															: option === 2
																? check.checked2
																: check.checked3
													}
													onChange={checkBoxHandleChange(`checked${option}`)}
												/>
											</span>
										) : null
									)}
								</div>
							</div>
							{screen.length > 0 ? (
								<div className="playlistCreateItemCont spaceBetWeen">
									<span className="playlistTabHead">Order:</span>
									<TextField
										className={"brancheScreen"}
										select
										title="order"
										value={orderTemp}
										onChange={handleChangeOrder}
									>
										{Array.from({ length: maxOrder }, (v, k) => k + 1).map(
											(a, i) => (
												<MenuItem key={a} dense={false} value={a}>
													{a}
												</MenuItem>
											)
										)}
									</TextField>
								</div>
							):null}
							<form id="form" onSubmit={fileUploadHandler}>
								<div
									className="spaceBetWeen"
									style={{ margin: "0.5rem 0", padding: "0 0.4rem" }}
								>
									<input type="file" onChange={selectFileHandler} />
									{uploadPercentage ? (
										<label
											style={{
												marginRight: "0.5rem",
												flex: "1",
												textAlign: "right"
											}}
										>
											{uploadPercentage}%
										</label>
									) : null}
									<span>
										<button
											style={{ width: "66px", height: "22px" }}
											type="submit"
											disabled={!selectedFile || uploadFileItem}
											className={
												!selectedFile || uploadFileItem ? "buttonDisabled" : ""
											}
										>
											Upload
										</button>
										<button
											style={{ width: "66px", height: "22px" }}
											type="reset"
											onClick={resetForm}
											disabled={!selectedFile}
											className={!selectedFile ? "buttonDisabled" : ""}
										>
											Cancel
										</button>
									</span>
								</div>
							</form>
							{uploadFileItem ? (
								<>
									<div className="fileContainer">
										{uploadFileItem.mimetype.split("/")[0] === "video" ? (
											<video
												controls
												preload="metadata"
												onLoadedMetadata={handleMetadata}
											>
												<source
													src={uploadFileItem.path}
													type={uploadFileItem.mimetype}
												/>
												Your browser does not support the video tag.
											</video>
										) : null}
										{uploadFileItem.mimetype.split("/")[0] === "image" ? (
											<img
												src={uploadFileItem.path}
												alt={uploadFileItem.filename}
											/>
										) : null}
										<div>{formatBytes(uploadFileItem.size)}</div>
									</div>
									<div className="playlistCreateItemCont spaceBetWeen">
										<span className="playlistTabHead">Show Time:</span>
										<div className="showTimeCont centerByFlex">
											<div className="centerByFlex">
												{uploadFileItem &&
													uploadFileItem.mimetype.split("/")[0] === "video" && (
													<>
														<span>{convertSecondsIntoString(duration)}x</span>
														<input
															className="multiply"
															placeholder="X"
															type="number"
															title="X"
															min="1"
															onChange={handleMultiply}
															value={multiply}
														/>
													</>
												)}
												<input
													placeholder="day"
													type="number"
													title="day"
													min="0"
													max="365"
													onChange={handleChangeDay}
													value={day}
												/>
												<input
													placeholder="hour"
													type="number"
													title="hour"
													min="0"
													max="23"
													onChange={handleChangeHour}
													value={hour}
												/>
												<input
													placeholder="min"
													type="number"
													title="minute"
													min="0"
													max="59"
													onChange={handleChangeMinute}
													value={minute}
												/>
												<input
													placeholder="sec"
													type="number"
													title="second"
													min="0"
													max="59"
													onChange={handleChangeSecond}
													value={second}
												/>
											</div>
											<span>
												{`${strDay} ${strHour} ${strMinute} ${strSecond} `}
											</span>
										</div>
									</div>
								</>
							) : null}
							<button
								onClick={createFile}
								disabled={!enableUpload}
								className={`createFileButton ${!enableUpload ? "buttonDisabled" : ""}`}
							>
								Create File
							</button>
						</div>

						<div className="playlistFilesContainer spaceBetWeen">
							<>
								<div className="allListLinkContainer fileList">
									<p className="head">File List</p>
									<ol className="list listHeight">
										{files.length > 0
											? files.map((file, i) => (
												<li className="playlistLink" key={i}>
													<div>
														<div style={{ fontWeight: "bold" }}>
															[{i + 1}]. {file.name}
														</div>
														<div className="spaceBetWeen">
															<div className="takitox">
																<span>
																	<span className="fileLi">
																		Screen:
																		<strong className="bold">
																			{file.screen.join(",")}
																		</strong>.
																	</span>
																	<span className="fileLi">
																		Order:
																		<strong className="bold">
																			{file.order}
																		</strong>.
																	</span>
																</span>
																<span className="fileLi">
																	Time:{" "}
																	<span style={{ fontWeight: "bold" }}>
																		{convertSecondsIntoString(file.showTime)}
																	</span>.
																</span>
															</div>
															<span>
																<IconButton
																	aria-label="Delete"
																	onClick={() => deleteFile(file, i)}
																	title="Delete"
																	style={{ padding: "3px" }}
																>
																	<DeleteIcon fontSize="small" />
																</IconButton>
															</span>
														</div>
													</div>
													<hr />
												</li>
											)) : null
										}
									</ol>
								</div>
							</>
						</div>
					</div>
				</div>
			</div>
			<Button variant="contained" onClick={createHandleClick}
				className={`createButton ${disableCreate ? "buttonDisabled" : ""}`}
				disabled={disableCreate} >
				{playlist ? "Update" : "Create"}
			</Button>

			<Modal open={open} onClose={handleClose} closeAfterTransition
				BackdropComponent={Backdrop} BackdropProps={{ timeout: 350 }} >
				<Fade in={open}>
					<div style={styles.tickerContainer}>
						<h3>Add Ticker</h3>
						<textarea
							ref={textRef}
							rows="10"
							cols="44"
							style={styles.textArea}
							defaultValue={ticker.text}
						></textarea>
						<div style={styles.chromePickerContainer}>
							<ChromePicker color={ticker.color} onChangeComplete={handleChangeTickerColor} />
							<div style={{ width: "calc(100% - 225px)" }}>
								<select value={ticker.fontSize} onChange={handleChangeFontSize} style={{ width: 100 }}>
									<option value={16}>16</option>
									<option value={24}>24</option>
									<option value={32}>32</option>
									<option value={64}>64</option>
									<option value={128}>128</option>
								</select>
								<div style={{ fontSize: `${ticker.fontSize}px`, color: `rgba(${ticker.color.r},${ticker.color.g},${ticker.color.b},${ticker.color.a})` }} className="tarStyle">A</div>
							</div>
						</div>
						<Button style={{ margin: "5px 0" }} onClick={handleSaveTicker}>
							Save
						</Button>
					</div>
				</Fade>
			</Modal>
		</div>
	) : <Loader />;
};

export default withRouter(fadeIn(CreatePlaylist));

const styles = {
	tickerContainer: {
		position: "absolute",
		backgroundColor: "#fff",
		border: "2px solid #000",
		padding: "16px 32px 24px",
		transform: "translate(-50%,-50%)",
		left: "50%",
		top: "50%"
	},
	textArea: {
		resize: "none",
		border: "1px solid grey"
	},
	chromePickerContainer: {
		padding: "0.5rem 0",
		display: "flex",
	}
};