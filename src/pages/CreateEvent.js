import moment from 'moment';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
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

const CreateEvent = () => {

  let history = useHistory();
  const [isLocationSelected, setIsLocationSelected] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [step, setStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(true);
  const [option, setOption] = useState("Custom Location");

  const callback = (step) => {
    setStep(step)
    console.log(step);
  }   
  const optionCallback = (option) => {
    setOption(option)
    console.log(option);
  }

  useEffect(() => {
    
    if(history.location.search){
      const parsed = queryString.parse(history.location.search);
      console.log(parsed);
      setIsLocationSelected(true);
      mapClickFn(parsed)
    }
  }, [])
  

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [eventImage, setEventImage] = useState();
  const [address, setAddress] = useState();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [type, setType] = useState("Promo");
  const [startDateTS, setStartDateTS] = useState();
  const [endDateTS, setEndDateTS] = useState();
  const [limit, setLimit] = useState();
  const [nft, setNFT] = useState();
  const [rewardUrl, setRewardUrl] = useState();
  const [websiteUrl, setWebsiteUrl] = useState();
  const [cover, setCover] = useState();
  const [rewardDescription, setRewardDescription] = useState();
  const [data, setData] = useState({});

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
    console.log(data);
  }
  const handleChangeEndDate = (data) => {
    console.log(data);
  }
  const handleChangeEndHour = (data) => {
    console.log(data);
  } 
  const handleChangeStartHour = (data) => {
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
                    <DefaultInput onChangeValue={handleChangeName} placeholder="Name your event here" label="Event name"/>
                    <DefaultInput disable={true} placeholder={currentUser.fullName} label="Organizer"/>
                    <DefaultInput onChangeValue={handleChangeDescription} type="description" placeholder="Write a brief summary about your event to get your attendees excited." label="Description"/>
                    <div className={styles.divider}></div>
                </div>
                <h3>Event Image (Optional)</h3>
                <p>This image will appear next to your listing. Use a high quality image (size x size).</p>
                <div className={styles.form}>
                    <FileUplod dataFromFileDrop={handleChangeEventImage} />
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
                    : <SearchAddressInputWithMap getAddress={handleChangeAddress} getLatLng={handleChangeLatLng}/> }
                    
                    <h3 style={{marginTop: "24px"}}>Date and Time</h3>
                    <p>Select scheduled events or create your own to let attendees know where to show up.</p>

                    <div className={styles.dateSection}>
                      <div><DateInput getDate={handleChangeStartDate} label={"Start Date"}/></div>
                      <div className={styles.dateInput}><TimeInput getHour={handleChangeStartHour} label={"Start Time"}/></div>
                    </div>
                    <div className={styles.dateSection}>
                      <div><DateInput getDate={handleChangeEndDate} label={"End Date"}/></div>
                      <div className={styles.dateInput}><TimeInput getHour={handleChangeEndHour} label={"End Time"}/></div>
                    </div>
                  </>
                  : ""
                  }
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
                  <SelectInput getType={handleChangeType} label={"Reward Type"} />
                </div>
                <h3>Number of Giveaways</h3>
                <p>Set the limit of how many prizes are to be given out to attendees.</p>
                {type == "NFT" ? <DefaultInput disable={true} onChangeValue={handleChangeLimit} forceValue={type} placeholder="1" label="Giveaway amount"/> : <DefaultInput onChangeValue={handleChangeLimit} forceValue={type} placeholder="Enter quantity" label="Giveaway amount"/>}
                
                {type == "NFT" || type == "FNFT" ? <Wallet onChangeValue={handleChangeNFT} /> : 
                <>
                  <h3>Links</h3>
                  <DefaultInput onChangeValue={handleChangeRewardUrl} placeholder="Enter URL" label="Reward Download URL" />
                  <DefaultInput onChangeValue={handleChangeWebsiteUrl} placeholder="Enter URL" label="Website URL"/>

                  <h3>Upload Cover Artwork</h3>
                  <p>This image will appear next to your listing. Use a high quality image 
          (size x size).</p>
                  <FileUplod dataFromFileDrop={handleChangeCoverImage}/>
                </>}
                
                <DefaultInput onChangeValue={handleGiveawayDescription} type={"description"} placeholder="Write a brief description about this reward." label="Giveaway Description (Optional)"/>
            </div>
        </div>
        : 
        step == 3
        ? 
        <div id="fourth-step">
            <div className={styles.header}>
              <a onClick={() => setStep(step - 1)}>Previous</a>
              <h1>Review & Publish</h1>
            </div>
            <div className={styles.body}>
              <RewardsPreviewCard title="Lorem ipsum dolor sit amet" date="FRIDAY, JUNE 24, 2022 AT 1:00 PM PST" address="1234 West 12st Ave, Vancouver, BC, VSX 9H9" type="NFT" />
              <h3>Rewards</h3>
            </div>
        </div>
        : ""
        }
        <EventBottomNavigation data={data} callback={callback} step={step}/>
      </div>
    </div>
  )
}

export default CreateEvent