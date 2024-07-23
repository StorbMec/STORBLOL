'use client'
import React, {useState} from 'react'
import './Gifting.css'
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import Button from '../Button/Button';
import giftIcon from '../../../public/icons/gift.svg';
import RPIcon from '../../../public/icons/rp.svg';
import Image from 'next/image'; 
import closeIcon from '../../../public/icons/close.svg';
import Alert from '../Alert/Alert'
import GiftSender from '../../middlewares/Gift';
import { useCookies } from 'react-cookie';
import { CSSTransition } from 'react-transition-group';
import InputMask from 'react-input-mask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

Gifting.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    currentRiotPoints: PropTypes.bool
};

/**
 * Renders the Gifting component.
 * @param {Object} props - The component props.
 * @param {string} props.id - The ID of the gift.
 * @param {string} props.name - The name of the gift.
 * @param {string} props.imageURL - The URL of the gift image.
 * @param {number} props.price - The price of the gift.
 * @param {number} props.currentRiotPoints - The current Riot Points balance.
 * @param {function} props.hideGifting - The function to hide the gifting component.
 * @returns {JSX.Element} The rendered Gifting component.
 */
export default function Gifting ({id, name, imageURL, price, currentRiotPoints, hideGifting}) {
    const [cookies, setCookie] = useCookies(['user', 'pass', 'xKey']);
    const SendGift = new GiftSender(cookies.user, cookies.pass);
    const [alert, setAlert] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [xKey, setXKey] = useState(cookies.xKey || '');
    const [showPassword, setShowPassword] = useState(false);
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    /**
     * Sets the gift parameters and sends the gift.
     */
    const handleXKeyChange = (event) => {
        setXKey(event.target.value);
    }

    const setGiftParameters = () => {
        
        const receiverInput = document.querySelector('.gifting-card-user-info input');
        const messageInput = document.querySelector('.gifting-card-user-info textarea');
        const receiver = receiverInput.value;
        const message = messageInput.value;
        messageInput.value = '';
        receiverInput.value = '';

        if (!receiver) {
            setAlert({ title: 'Error!', message: 'You forgot to add a receiver.', type: 'error' });
            setShowAlert(true);
            return;
        }
        if (!receiver.includes('#')) {
            setAlert({ title: 'Error!', message: 'You forgot to add the tag of the receiver', type: 'error' });
            setShowAlert(true);
            return;
        }

        if (!xKey) {
            setAlert({ title: 'Error!', message: 'X-KEY is required.', type: 'error' });
            setShowAlert(true);
            return;
        }
        if (!/^([A-Z0-9]{4}-){7}[A-Z0-9]{4}$/.test(xKey)) {
            setAlert({ title: 'Error!', message: 'Invalid X-KEY format.', type: 'error' });
            setShowAlert(true);
            return;
        }
        if (!message) {
            setAlert({ title: 'Error!', message: 'A message is required', type: 'error' });
            setShowAlert(true);
            return;
        }

        SendGift.setGiftParameters(id, message, receiver);
        SendGift.sendGift().then(() => {
            // Set xKey as a cookie on successful gift send
            setCookie('xKey', xKey, { path: '/' });
            setAlert({ title: 'Success!', message: 'Your gift was sent', type: 'success' });
            setShowAlert(true);
        });
    }

    return (
      <div className='gifting-card'>
        <div className='gifting-card-parameters'>
            <div className='gifting-card-header'>
                <h1>Almost there...</h1>
            </div>
            <div className='gifting-card-user'>
                <div className='gifting-card-user-info' id='username'>
                    <label>
                        Who do you want to gift to?
                    </label>
                    <input className='gifting-send-message-input' placeholder='Summoner#TAG'/>
                    
                </div>
                <div className='gifting-card-user-info' id='xkey'>
            <label>
                Please enter your X-KEY:
            </label>
            <div className='input-x-key'>
                <InputMask
                    mask="****-****-****-****-****-****-****-****"
                    placeholder='AB12-CD34-EF56-GH78-IJ90-KL12-MN34-OP56'
                    className='gifting-send-message-input'
                    onChange={handleXKeyChange}
                    value={xKey}
                    type={showPassword ? 'text' : 'password'}
                />
                <button onClick={togglePasswordVisibility} className='input-x-key-show-password-button'>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
            </div>
        </div>
                <div className='gifting-card-user-info'>
                    <label>
                        Wanna send any message?
                    </label>
                    <div className='gifting-send-message'>
                    <textarea className='gifting-send-message-input' placeholder='Message'/>
                    </div>
                </div>
                
            </div>
        </div>
        <div className='gifting-card-item-card'>
            <div className='gifting-card-item-header'>
                <p>Checkout details</p>
                <button className='gifting-card-close-button' onClick={()=>{hideGifting();}}>
                    <Image  src={closeIcon} alt='Gift icon' width={10} height={10}/>
                </button>
            </div>
            <div className='gifting-card-item'>
                <div className='card-container'>
                    <Card id={id} name={name} imageURL={imageURL} price={price} showButton={false}/>
                </div>
                <div className='gifting-card-balance'>
                    <label>
                        Current:
                    </label>
                    <div className='gifting-card-balance-content'>
                        <Image src={RPIcon} alt='Riot Points icon' width={8} height={8}/>    
                        <p>
                            {currentRiotPoints}
                        </p>
                    </div>
                    <label>
                        Gift total:
                    </label>
                    <div className='gifting-card-balance-content'>
                        <Image src={RPIcon} alt='Riot Points icon' width={8} height={8}/>
                        <p>
                            {price}
                        </p>
                    </div>
                    <label>
                        Balance:
                    </label>
                    <div className='gifting-card-balance-content'>
                        <Image src={RPIcon} alt='Riot Points icon' width={8} height={8}/>
                        <p>
                            {currentRiotPoints - price}
                        </p>
                    </div>
                </div>
            </div>
            <div className='gift-card-user-decision'>
                
                <span className='gift-card-maybe-letter' onClick={()=>{hideGifting();}}>
                    Maybe later...
                </span>
                <div className='gift-card-button-container'>
                <Button icon={giftIcon} onButtonClick={setGiftParameters} text='Send gift'/>  
                </div>
            </div>
        </div>
        <CSSTransition
            in={showAlert}
            timeout={300}
            classNames="alert"
            unmountOnExit
        >
        {state=>(   
            <div>
                {showAlert &&
            <Alert
                title={alert.title}
                message={alert.message}
                type={alert.type}
                hideAlertFunction={()=>{setShowAlert(false)}}
            />
                }
            </div>        
        )
        }
        </CSSTransition>
      </div>
    )
}
