'use client'
// External imports
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import Image from 'next/image';

import Store from '../middlewares/Store';
import LeftMenu from '../components/LeftMenu/LeftMenu';
import Gifting from '../components/Gifting/Gifting';
import Card from '../components/Card/Card';
import riotPointsIcon from '../../public/icons/rp.svg';
import { CSSTransition ,TransitionGroup } from 'react-transition-group';

// Styles
import './home.css';

// Constants

const Loja = new Store();

export default function Home() {
    
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [numColumns, setNumColumns] = useState(5);
    const [showGifting, setShowGifting] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [userRiotPoints, setUserRiotPoints] = useState(0);

    const [cookies, addCookies, removeCookies] = useCookies(['user', 'pass']);
    const router = useRouter();
   
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const columnWidth = 300;
            const newNumColumns = Math.floor(width / columnWidth);
            setNumColumns(newNumColumns);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []); 

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const toggleGifting = (id, name, imageURL, price, tier) => {
        setSelectedItem({id, name, imageURL, price, tier});
        setShowGifting(!showGifting);
    }

    const Cell = ({ columnIndex, rowIndex, style }) => {
        const item = filteredItems[rowIndex * numColumns + columnIndex];
        return item ? (
            <div style={style} key={item.id} className='store-content-items-card'>
                <Card id={item.id} name={item.name} imageURL={item.imageURL} price={item.price} onButtonClick={toggleGifting} showButton={true} />
            </div>
        ) : null;
    };

    const numRows = Math.ceil(filteredItems.length / numColumns);

    const getItems = async (type) => {
        const items = await Loja.getCatalogByType(type);
        setItems(items);
    }
    const getAmountOfRP = async () => {
        const rp = await Loja.getRiotPoints();
        setUserRiotPoints(rp);
    }

    const logout = () => {
        removeCookies('user');
        removeCookies('pass');
        router.push('/login');
    }

    useEffect(() => {
        const fetchItems = async () => {
            if (!cookies.user || !cookies.pass) {
                router.push('/login');
            }
            await Loja.fetchCatalog();
            await Loja.fetchRiotPoints();
            await getItems('CHAMPION');
            await getAmountOfRP();
        };
    
        fetchItems();
    }, []);
    

    return (
        <main>
            <div className='store-left-menu'>
                <LeftMenu changeStore={getItems} availableCategories={Loja.getAvailablesCategories()} logoutFunction={logout}/>
            </div>
            <div className='store-body'>
                <div className='store-content'>
                    <TransitionGroup>
                        <CSSTransition
                            key={Loja.currentCategory}
                            timeout={500}
                            classNames="fade"
                        >
                            <div className='store-content-header'>
                                <Image src={Loja.currentIcon} width={30} alt={Loja.currentCategory}/>
                                <h1>{Loja.currentCategory}</h1>
                                <div className='items-search-bar'>
                                    <input type='text'  placeholder='Wanna search of anything in specific?' onChange={handleSearchChange} />
                                </div>
                                <div className='store-content-header-riot-points'>
                                    <Image src={riotPointsIcon} width={20} alt='Riot Points icon' />
                                    <p>{userRiotPoints}</p>
                                </div>
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                    <div className='store-content-items'>
                        <AutoSizer>
                            {({height, width}) => (
                                <Grid
                                    columnCount={numColumns}
                                    columnWidth={260} 
                                    height={height} 
                                    rowCount={numRows}
                                    rowHeight={410} 
                                    width={width} 
                                >
                                    {Cell}
                                </Grid>
                            )}
                        </AutoSizer>
                    </div>
                </div>
            </div>
            {showGifting && <div className="backdrop"></div>}
            <CSSTransition
                in={showGifting}
                timeout={300}
                classNames="gifting"
                unmountOnExit
            >
                {() => (
                    <div>
                        {showGifting && 
                            <Gifting 
                                id={selectedItem.id} 
                                name={selectedItem.name} 
                                imageURL={selectedItem.imageURL} 
                                price={selectedItem.price} 
                                tier={selectedItem.tier} 
                                currentRiotPoints={userRiotPoints}
                                username={cookies.user}
                                password={cookies.pass}
                                hideGifting={toggleGifting}
                            />
                        }
                    </div>
                )}
            </CSSTransition>
        </main>
    );
}