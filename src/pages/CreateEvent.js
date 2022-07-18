import moment from 'moment';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom'
import EventBottomNavigation from '../components/bar/EventBottomNavigation'
import EventDetailsBar from '../components/bar/EventDetailsBar'
import CustomButtonLight from '../components/button/CustomButtonLight'
import RewardsPreviewCard from '../components/card/RewardsPreviewCard'
import DateInput from '../components/input/date/DateInput'
import DefaultInput from '../components/input/DefaultInput'
import FileUplod from '../components/input/FileUplod'
import SearchAddressInputWithMap from '../components/input/SearchAddressInputWithMap'
import SelectInput from '../components/input/select/SelectInput'
import TimeInput from '../components/input/time/TimeInput'
import Wallet from '../components/wallet/Wallet'
import styles from './styles/createevent.module.scss'
import axios from 'axios'
import queryString from 'query-string';
import RewardsTable from '../components/table/RewardsTable';
import RewardsPreview from '../components/table/RewardsPreview';
import { setNFTPoint, setPoint } from '../actions/point';
import EventSuccess from '../pages/EventStatus/EventSuccess'

const CreateEvent = () => {
  
  let dataFlow = {};
  let history = useHistory();
  const [isLocationSelected, setIsLocationSelected] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [step, setStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(true);
  const [option, setOption] = useState("Custom Location");

  const [title, setTitle] = useState();
  const [author, setAuthor] = useState(currentUser.fullName);
  const [description, setDescription] = useState();
  const [eventImage, setEventImage] = useState({preview: "", file: {}});
  const [address, setAddress] = useState();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [type, setType] = useState("PROMO");
  const [startDateTS, setStartDateTS] = useState(moment().format("YYYY-MM-DD"));
  const [startHour, setStartHour] = useState(moment().format('HH:mm A'));
  const [endDateTS, setEndDateTS] = useState(moment().add(1, 'day').format("YYYY-MM-DD"));
  const [endHour, setEndHour] = useState(moment().add(2, 'hours').format('HH:mm A'));
  const [limit, setLimit] = useState();
  const [nft, setNFT] = useState();
  const [rewardUrl, setRewardUrl] = useState();
  const [websiteUrl, setWebsiteUrl] = useState();
  const [cover, setCover] = useState({fileName: "", file:""});
  const [rewardDescription, setRewardDescription] = useState();
  const [error, setError] = useState([]);
  const dispatch = useDispatch();
  const callback = (step) => {
    setStep(step)
  }   
  const optionCallback = (option) => {
    setOption(option)
  }

  useEffect(() => {
    if(history.location.search){
      const parsed = queryString.parse(history.location.search);
      setIsLocationSelected(true);
      setLat(parsed.lng);
      setLng(parsed.lat);
      mapClickFn(parsed);
    }
  }, [])
  
  const [data, setData] = useState({
    title: title,
    author: currentUser.fullName,
    description: description,
    event_image: eventImage,
    lng: lng,
    lat: lat,
    radius: 10,
    address: address,
    startDateTS: "",
    endDateTS: "",
    type: type,
    limit: limit,
    createdAt: moment().unix(),
  });

  const mapClickFn = async (coordinates) => {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      coordinates.lng +
      "," +
      coordinates.lat +
      ".json?access_token=" +
      "pk.eyJ1Ijoia3ViaWxheWNrbWsiLCJhIjoiY2w0NjNvdmZvMDRzYTNqbHJ3enJ4b29mYSJ9.R8rk-T-yUlMh2bjNp1EBew" +
      "&types=address";
    await axios.get(url).then((res) => {
      const { features } = res.data;
      if(features.length != 0){
        console.log(features[0].place_name);
        setAddress(features[0].place_name);
      }
    }).catch((e) => {
      console.log(e);
    });
  }

  const handleChangeName = (event) => {
    setTitle(event.target.value)
  }
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  }
  const handleChangeEventImage = (data) => {
    console.log(data);
    setEventImage(data);
  }
  const handleChangeAddress = (data) => {
    setAddress(data);
  }
  const handleChangeLatLng = (data) => {
    setLat(data.lat);
    setLng(data.lng)
  }
  const handleChangeStartDate = (data) => {
    setStartDateTS(moment(data).format("YYYY-MM-DD"));
    console.log(moment(data).format("YYYY-MM-DD"));
  }
  const handleChangeEndDate = (data) => {
    setEndDateTS(moment(data).format("YYYY-MM-DD"));
    console.log(moment(data).format("YYYY-MM-DD"));
  }
  const handleChangeEndHour = (data) => {
    setEndHour(data);
    console.log(data);
  } 
  const handleChangeStartHour = (data) => {
    setStartHour(data);
    console.log(data);
  }
  const handleChangeType = (data) => {
    setType(data.target.value);
  }
  const handleChangeLimit = (data) => {
    setLimit(data.target.value)
  }
  const handleChangeNFT = (data) => {
    console.log(data);
    setNFT(data);
  }
  const handleChangeRewardUrl = (data) => {
    setRewardUrl(data.target.value)
  }
  const handleChangeWebsiteUrl = (data) => {
    setWebsiteUrl(data.target.value)
  }
  const handleChangeCoverImage = (data) => {
    console.log(data);
    setCover(data);
  }
  const handleGiveawayDescription = (data) => {
    setRewardDescription(data.target.value);
  }
  let errorMap = [];

  const handleChangePage = (step) => {
    if(step == 0){
      setError([]);
      if(title && author && description){
        errorMap = [];
        setError([]);
        setStep(1)
      }else{
        if(!title) errorMap.push("Event name *")
        if(!author) errorMap.push("Organizer *")
        if(!description) errorMap.push("Description *")
        setError(errorMap)
      }
    }else if(step == 1){
      setError([]);
      if(address && lat && lng && startDateTS && endDateTS && startHour && endHour){
        errorMap = [];
        setError([]);
        setStep(2)
      }else{
        if(!address) errorMap.push("Venue Address *")
        if(!lat) errorMap.push("lat")
        if(!lng) errorMap.push("lat")
        if(!startDateTS) errorMap.push("Start Date")
        if(!endDateTS) errorMap.push("End Date")
        if(!startHour) errorMap.push("Start Time")
        if(!endHour) errorMap.push("End Time")
        setError(errorMap)
      }
    }else if(step == 2){
      setError([]);
      if(type == "PROMO"){
        if(type && limit && rewardUrl && websiteUrl && cover){
          errorMap = [];
          setError([]);
          setData({
            title:title,
            author: author,
            description: description,
            event_image: eventImage.preview,
            lng: lng,
            lat: lat,
            radius: 10,
            address: address,
            startDateTS: moment(startDateTS + " " + startHour).format('X'),
            endDateTS: moment(endDateTS + " " + endHour).format("X"),
            type: type,
            limit: limit,
            createdAt: moment().format('x'),
            detail:{
              download_url: rewardUrl,
              website: websiteUrl,
              image: cover.preview
            }
          })

          setStep(3)
        }else{
          if(!type) errorMap.push("Reward Type")
          if(!limit) errorMap.push("Giveaway amount *")
          if(!rewardUrl) errorMap.push("Reward Download URL *")
          if(!websiteUrl) errorMap.push("Website URL *")
          if(!cover) errorMap.push("cover")
          setError(errorMap)
        }
      }else if(type == "NFT"){
        if(nft){
          errorMap = [];
          setError([]);
          setData({
            title:title,
            author: author,
            description: description,
            event_image: eventImage.preview,
            lng: lng,
            lat: lat,
            radius: 10,
            address: address,
            startDateTS: moment(startDateTS + " " + startHour).format('X'),
            endDateTS: moment(endDateTS + " " + endHour).format("X"),
            type: type,
            limit: 1,
            createdAt: moment().format('x'),
            detail:nft
          })
          setStep(3)
        }else{
          if(!nft) errorMap.push("Select NFTs")
          setError(errorMap)
        }
      }else if(type == "FNFT"){
        if(limit && nft){
          errorMap = [];
          setError([]);
          setData({
            title:title,
            author: author,
            description: description,
            event_image: eventImage.preview,
            lng: lng,
            lat: lat,
            radius: 10,
            address: address,
            startDateTS: moment(startDateTS + " " + startHour).format('X'),
            endDateTS: moment(endDateTS + " " + endHour).format("X"),
            type: type,
            limit: limit,
            createdAt: moment().format('x'),
            detail:nft
          })
          setStep(3)
        }else{
          if(!limit) errorMap.push("Giveaway amount *")
          if(!nft) errorMap.push("Select NFTs")
          setError(errorMap)
        }
      }
    }else if(step == 3){
      console.log(data);
      if(type == "PROMO"){
        dispatch(setPoint(data));
        setStep(4)
      }else if(type == "NFT" || type == "FNFT"){
        console.log(data);
        dispatch(setNFTPoint(data));
        setStep(4)
      }
    }
  }

  return (
    <div className={styles.event}>
      <EventDetailsBar step={step}/>
      <div className={styles.eventOutter}>
        {step == 0
        ?
        <div id="first-step">
            <div className={styles.header}>
            <h1>Event Details</h1>
            </div>
            <div className={styles.body}>
                <h3>Basic Info</h3>
                <p>Add details about your event to make it stand out.</p>
                <div className={styles.form}>
                    <DefaultInput error={error} required={true} onChangeValue={handleChangeName} placeholder="Name your event here" label="Event name *"/>
                    <DefaultInput error={error} disable={true} placeholder={currentUser.fullName} label="Organizer *"/>
                    <DefaultInput error={error} required={true} onChangeValue={handleChangeDescription} type="description" placeholder="Write a brief summary about your event to get your attendees excited." label="Description *"/>
                    <div className={styles.divider}></div>
                </div>
                <h3>Event Image (Optional)</h3>
                <p>This image will appear next to your listing. Use a high quality image (size x size).</p>
                <div className={styles.form}>
                    <FileUplod dataFromFileDrop={handleChangeEventImage} />
                </div>
            </div>
            <div className={styles.bottomNavigation}>
            <div className={styles.bottomNavigationOuter}>
                <NavLink to={"/event"}>Discard</NavLink>
                <button className={styles.button} onClick={() => handleChangePage(step)}><span>Next</span></button>
            </div>
    </div>
        </div>
        :
        step == 1
        ?
        <div id="second-step">
            <div className={styles.header}>
              <a onClick={() => setStep(step - 1)}>Previous</a>
              <h1>Distribution Options</h1>
            </div>
            <div className={styles.body}>
                <h3>Event Location</h3>
                <p>Select scheduled events or create your own to let attendees know where to show up.</p>
                <div className={styles.form}>
                  <CustomButtonLight callback={optionCallback} option={option} label={"Existing Event"}/>
                  <span style={{marginLeft: "32px"}}><CustomButtonLight callback={optionCallback} option={option} label={"Custom Location"}/></span>

                  {option == "Custom Location" 
                  ? 
                  <>
                    
                    {isLocationSelected ? 
                    <>
                      <div style={{marginTop: "24px"}}>
                        <p><b>Address: </b> {address}</p>
                      </div>
                    </>
                    : <SearchAddressInputWithMap error={error} getAddress={handleChangeAddress} getLatLng={handleChangeLatLng}/> }
                    
                    <h3 style={{marginTop: "24px"}}>Date and Time</h3>
                    <p>Select scheduled events or create your own to let attendees know where to show up.</p>

                    <div className={styles.dateSection}>
                      <div><DateInput error={error} getDate={handleChangeStartDate} label={"Start Date"}/></div>
                      <div className={styles.dateInput}><TimeInput error={error} getHour={handleChangeStartHour} label={"Start Time"}/></div>
                    </div>
                    <div className={styles.dateSection}>
                      <div><DateInput error={error} getDate={handleChangeEndDate} label={"End Date"}/></div>
                      <div className={styles.dateInput}><TimeInput error={error} getHour={handleChangeEndHour} label={"End Time"}/></div>
                    </div>
                  </>
                  : ""
                  }
                </div>
            </div>
            <div className={styles.bottomNavigation}>
              <div className={styles.bottomNavigationOuter}>
                  <NavLink to={"/event"}>Discard</NavLink>
                  <button className={styles.button} onClick={() => handleChangePage(step)}><span>Next</span></button>
              </div>
            </div>
        </div>
        : 
        step == 2
        ?
        <div id="third-step">
            <div className={styles.header}>
              <a onClick={() => setStep(step - 1)}>Previous</a>
              <h1>Rewards</h1>
            </div>
            <div className={styles.body}>
                <h3>Reward Details</h3>
                <p>Select the type of rewards your attendees will receive.</p>
                <div className={styles.form}>
                  <SelectInput error={error} getType={handleChangeType} label={"Reward Type"} />
                </div>
                <h3>Number of Giveaways</h3>
                <p>Set the limit of how many prizes are to be given out to attendees.</p>
                {type == "NFT" 
                ? <DefaultInput error={error} disable={true} onChangeValue={handleChangeLimit} forceValue={type} placeholder="1" label="Giveaway amount *"/> 
                : <DefaultInput error={error} onChangeValue={handleChangeLimit} forceValue={type} placeholder="Enter quantity" label="Giveaway amount *"/>}
                
                {type == "NFT" || type == "FNFT" ? <Wallet onChangeValue={handleChangeNFT} /> : 
                <>
                  <h3>Links</h3>
                  <DefaultInput error={error} onChangeValue={handleChangeRewardUrl} placeholder="Enter URL" label="Reward Download URL *" />
                  <DefaultInput error={error} onChangeValue={handleChangeWebsiteUrl} placeholder="Enter URL" label="Website URL *"/>

                  <h3>Upload Cover Artwork</h3>
                  <p>This image will appear next to your listing. Use a high quality image 
                    (size x size). required *</p>
                  <FileUplod dataFromFileDrop={handleChangeCoverImage}/>
                </>}
                
                <DefaultInput error={error} onChangeValue={handleGiveawayDescription} type={"description"} placeholder="Write a brief description about this reward." label="Giveaway Description (Optional)"/>

                <div className={styles.bottomNavigation}>
                <div className={styles.bottomNavigationOuter}>
                    <NavLink to={"/event"}>Discard</NavLink>
                    <button className={styles.button} onClick={() => handleChangePage(step)}><span>Next</span></button>
                </div>
              </div>
            </div>
        </div>
        : 
        step == 3
        ? 
        <div id="fourth-step">
            <div className={styles.header}>
              <a onClick={() => setStep(step - 1)}>Previous</a>
              <h1 style={{marginBottom: "48px", marginTop: "24px"}}>Review & Publish</h1>
            </div>
            <div className={styles.body}>
              <RewardsPreviewCard data={data} image={eventImage} />
              <h3 style={{marginTop: "48px"}}>Rewards</h3>
              {/* <RewardsPreview /> */}
              <RewardsTable rewards={data} cover={cover} />
            </div>
            <div className={styles.bottomNavigation}>
              <div className={styles.bottomNavigationOuter}>
                  <NavLink to={"/event"}>Discard</NavLink>
                  <button className={styles.button} onClick={() => handleChangePage(step)}><span>Submit</span></button>
              </div>
            </div>
        </div>
        : step == 4 
        ?
         <EventSuccess />
        : 
        ""
        }
      </div>
    </div>
  )
}

export default CreateEvent