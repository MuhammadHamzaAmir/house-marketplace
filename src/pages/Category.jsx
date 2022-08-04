import {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import {collection, getDocs,query,where,limit,orderBy,startAfter} from "firebase/firestore";
import {toast} from 'react-toastify';
import {db} from "../firebase.config"
import Spinner from '../components/Spinner';

function Category() {

    const [loading,setLoading] = useState(true);
    const [listings,setListings] = useState(null);

    const params = useParams();

    useEffect(() => {

        const fetchLstings = async() => {
            try {

                const listingsRef = collection(db,'listings')

                const q = query(listingsRef,where('type','==',params.categoryName), orderBy('timestamp','desc'),limit(10))
                
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
                toast.error("Can not get any listings");
            }

        } 
        fetchLstings();
    }, [params.categoryName])

    return (
        <div className="category">
            <header>
                <p className="pageHeader">
                    {params.categoryName === 'rent' ? 'Places for Rent' : "Places for Sale"}
                </p>
            </header>
            
            {loading ? <Spinner /> : listings && listings.length > 0 ? 
            <>
                <main>
                    <ul className="categoryListings">
                        {listings.map(listing => {
                            return <h3 key={listing.id}>{listing.data.name}</h3>})}
                    </ul>
                </main>
            </> 
            : <p>No listings for {params.categoryName}</p>}
        </div>
    )
}

export default Category