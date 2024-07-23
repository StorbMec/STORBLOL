'use client'
import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import Image from "next/image";
import solidWave from '../../../public/images/card/wave.svg'
import translucidWave from '../../../public/images/card/wave-translucid.svg'
import giftIcon from '../../../public/icons/gift.svg'
import riotPoints from '../../../public/icons/rp.svg'
import Button from '../Button/Button'

Card.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

/**
 * Componente do card dos itens da loja. Retorna o elemento HTML com a imagem, nome, tier, preço e botão de enviar presente.
 *
 * @param {string} props.id - Identificador do item.
 * @param {string} props.name - Nome do item
 * @param {string} props.imageURL - URL da imagem do item
 * @param {number} props.price - Preço do item em Riot Points
 * @param {boolean} props.showButton - Se o botão de enviar presente deve ser exibido. Por padrão, é exibido.
 */
export default function Card({ id, name, imageURL, price, showButton = true, onButtonClick}) {
    const handleButtonClick = () => {
        onButtonClick(id, name, imageURL, price);
    };
    return (
        <div className="card" id={id}>
            <div className='image-placeholder'>
                <div className='image-container'>
                    <Image priority  className='item-image' src={imageURL} alt={name} width={1254} height={739}/>
                    <div className='wave-container'>
                        <Image priority layout='responsive' className='translucid-wave' src={translucidWave} alt='wave' width={1000} height={100} />
                        <Image priority layout='responsive' className='solid-wave' src={solidWave} alt='wave' width={1000} height={100}/>
                    </div>
                </div>
            </div>
            <div className="card-content">
                <div className='item-info'>
                    <div className='item-name'>
                        <h1>Item name</h1>
                        <p>{name}</p>
                    </div>
                    <div className='item-price'>
                        <h1>Riot Points</h1>
                        <p>
                            <Image src={riotPoints} className="rp-icon" alt='rp' width={10} height={10}/>
                            {price}
                        </p>
                    </div>
                    
                </div>
                <div className='item-price-and-send'>
                   
                    {
                        showButton && (
                            <div className='card-button-container'>
                                <Button onButtonClick={handleButtonClick} icon={giftIcon} iconsize={9} text='Send gift'/>
                            </div>
                        )

                    }
                </div>
            </div>
        </div>
    );
}