import {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import {collection, getDocs,query,where,limit,orderBy,startAfter} from "firebase/firestore";
import {toast} from 'react-toastify';
import {db} from "../firebase.config"
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';

function Offers() {

    const [loading,setLoading] = useState(true);
    const [listings,setListings] = useState(null);

    const params = useParams();


    useEffect(() => {

        const fetchLstings = async() => {
            try {

                const listingsRef = collection(db,'listings')

                const q = query(listingsRef,where('offer','==',true), orderBy('timestamp','desc'),limit(10))
                
                const querySnap = await getDocs(q);
                const listings = [];
                querySnap.forEach(doc => {
                    return listings.push(
                        {
                            id: doc.id,
                            data: doc.data()
                        }
                    )
                });
                setListings(listings);
                setLoading(false);
            } catch (error) {
                toast.error("Can not get any Offers");
            }

        } 
        fetchLstings();
    }, [])

    return (
        <div className="category">
            <header>
                <p className="pageHeader">
                   Offers
                </p>
            </header>
            
            {loading ? <Spinner /> : listings && listings.length > 0 ? 
            <>
                <main>
                    <ul className="categoryListings">
                        {listings.map(listing => {
                            return <ListingItem listing={listing.data} id={listing.id} key={listing.id} />})}
                    </ul>
                </main>
            </> 
            : <p>No Offers</p>}
        </div>
    )
}

export default Offers