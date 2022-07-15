import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import EventBottomNavigation from '../components/bar/EventBottomNavigation'
import EventDetailsBar from '../components/bar/EventDetailsBar'
import CustomButtonLight from '../components/button/CustomButtonLight'
import RewardsPreviewCard from '../components/card/RewardsPreviewCard'
import DateInput from '../components/input/date/DateInput'
import DefaultInput from '../components/input/DefaultInput'
import FileUplod from '../components/input/FileUplod'
import SearchAddressInput from '../components/input/SearchAddressInput'
import SearchAddressInputWithMap from '../components/input/SearchAddressInputWithMap'
import SelectInput from '../components/input/select/SelectInput'
import TimeInput from '../components/input/time/TimeInput'
import Wallet from '../components/wallet/Wallet'
import EventFailed from './EventStatus/EventFailed'
import EventSuccess from './EventStatus/EventSuccess'
import styles from './styles/createevent.module.scss'

const CreateEvent = ({ fullName="Kubilay Cakmak" }) => {

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
                    <DefaultInput placeholder="Name your event here" label="Event name"/>
                    <DefaultInput disable placeholder={fullName} label="Organizer"/>
                    <DefaultInput type="description" placeholder="Write a brief summary about your event to get your attendees excited." label="Description"/>
                    <div className={styles.divider}></div>
                </div>
                <h3>Event Image (Optional)</h3>
                <p>This image will appear next to your listing. Use a high quality image (size x size).</p>
                <div className={styles.form}>
                    <FileUplod />
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
                    <SearchAddressInputWithMap />
                    <h3 style={{marginTop: "48px"}}>Date and Time</h3>
                    <p>Select scheduled events or create your own to let attendees know where to show up.</p>

                    <div className={styles.dateSection}>
                      <div><DateInput  label={"Start Date"}/></div>
                      <div className={styles.dateInput}><TimeInput  label={"Start Time"}/></div>
                    </div>
                    <div className={styles.dateSection}>
                      <div><DateInput label={"End Date"}/></div>
                      <div className={styles.dateInput}><TimeInput label={"End Time"}/></div>
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
                  <SelectInput label={"Reward Type"} />
                </div>
                <h3>Number of Giveaways</h3>
                <p>Set the limit of how many prizes are to be given out to attendees.</p>
                <DefaultInput placeholder="Enter quantity" label="Giveaway amount"/>
                <h3>Select Wallet</h3>
                  <Wallet />
                <h3>Select NFTs</h3>
                <DefaultInput type={"description"} placeholder="Write a brief description about this reward." label="Giveaway Description (Optional)"/>
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
        <EventBottomNavigation callback={callback} step={step}/>
      </div>
    </div>
  )
}

export default CreateEvent