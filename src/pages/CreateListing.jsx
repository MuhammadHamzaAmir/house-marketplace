import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function CreateListing() {
    const [geoLocationEnabled, setGeoLocationEnabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        type: "rent",
        regularPrice: 0,
        discountedPrice: 0,
        bathrooms: 1,
        bedrooms: 1,
        offer: false,
        parking: false,
        furnished: false,
        location: "",
        imageUrls: [],
        lat: 0,
        lng: 0,
    });

    const {
        name,
        type,
        regularPrice,
        discountedPrice,
        bathrooms,
        bedrooms,
        offer,
        parking,
        furnished,
        location,
        imageUrls,
        lat,
        lng,
    } = formData;

    const auth = getAuth();
    const navigate = useNavigate();
    const isMounted = useRef(true);

    useEffect(() => {
        if (isMounted) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setFormData({
                        ...formData,
                        userRef: user.uid,
                    });
                } else {
                    navigate("/sign-in");
                }
            });
        }

        return () => {
            isMounted.current = false;
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, auth, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const listing = {
            name,
            type,
            regularPrice,
            discountedPrice,
            bathrooms,
            bedrooms,
            offer,
            parking,
            furnished,
            location,
            imageUrls,
            lat,
            lng,
            userRef: formData.userRef,
            timestamp: new Date().toISOString(),
        };
    };

    const onMutate = (e) => {
        let boolean = null;

        if (e.target.value === "true") {
            boolean = true;
        }
        if (e.target.value === "false") {
            boolean = false;
        }

        // Files
        if (e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                imageUrls: e.target.files,
            }));
        }

        // text/numbers/boolean
        if(!(e.target.files)){
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value,
            }));
        }
    };

    if (loading) {
        return <Spinner />;
    }
    return (
        <div className="profile">
            <header>
                <p className="pageHeader">Create a Listing</p>
            </header>
            <main>
                <form onSubmit={handleSubmit}>
                    <label className="formLabel">Sell / Rent</label>
                    <div className="formButtons">
                        <button
                            className={
                                formData.type === "rent" ? "formButtonActive" : "formButton"
                            }
                            type="button"
                            id="type"
                            value="rent"
                            onClick={onMutate}
                        >
                            Rent
                        </button>
                        <button
                            className={
                                formData.type === "sell" ? "formButtonActive" : "formButton"
                            }
                            type="button"
                            id="type"
                            value="sell"
                            onClick={onMutate}
                        >
                            Sell
                        </button>
                    </div>
                    <label className="formLabel">Name</label>
                    <input
                        className="formInputName"
                        type="text"
                        id="name"
                        value={name}
                        onChange={onMutate}
                        maxLength="32"
                        minLength={10}
                        required
                    />

                    <div className="formRooms flex">
                        <div>
                            <label className="formLabel">Bedrooms</label>
                            <input
                                className="formInputSmall"
                                type="number"
                                id="bedrooms"
                                value={bedrooms}
                                onChange={onMutate}
                                min="1"
                                max="50"
                                required
                            />
                        </div>
                        <div>
                            <label className="formLabel">Bathrooms</label>
                            <input
                                className="formInputSmall"
                                type="number"
                                id="bathrooms"
                                value={bathrooms}
                                onChange={onMutate}
                                min="1"
                                max="50"
                                required
                            />
                        </div>
                    </div>
                    <label className="formLabel">Parking spot</label>
                    <div className="formButtons">
                        <button
                            className={parking ? "formButtonActive" : "formButton"}
                            type="button"
                            id="parking"
                            value={true}
                            onClick={onMutate}
                            min="1"
                            max="50"
                        >
                            Yes
                        </button>
                        <button
                            className={
                                !parking && parking !== null
                                    ? "formButtonActive"
                                    : "formButton"
                            }
                            type="button"
                            id="parking"
                            value={false}
                            onClick={onMutate}
                        >
                            No
                        </button>
                    </div>
                    <label className="formLabel">Furnished</label>
                    <div className="formButtons">
                        <button
                            className={furnished ? "formButtonActive" : "formButton"}
                            type="button"
                            id="furnished"
                            value={true}
                            onClick={onMutate}
                        >
                            Yes
                        </button>
                        <button
                            className={
                                !furnished && furnished !== null
                                    ? "formButtonActive"
                                    : "formButton"
                            }
                            type="button"
                            id="furnished"
                            value={false}
                            onClick={onMutate}
                        >
                            No
                        </button>
                    </div>
                    <label className="formLabel">Address</label>
                    <textarea
                        className="formInputAddress"
                        type="text"
                        id="location"
                        value={location}
                        onChange={onMutate}
                        required
                    />
                    {!geoLocationEnabled && (
                        <div className="formLatLng flex">
                            <div>
                                <label className="formLabel">Latitude</label>
                                <input
                                    className="formInputSmall"
                                    type="number"
                                    id="lat"
                                    value={lat}
                                    onChange={onMutate}
                                    required
                                />
                            </div>
                            <div>
                                <label className="formLabel">Longitude</label>
                                <input
                                    className="formInputSmall"
                                    type="number"
                                    id="lng"
                                    value={lng}
                                    onChange={onMutate}
                                    required
                                />
                            </div>
                        </div>
                    )}
                    <label className="formLabel">Offer</label>
                    <div className="formButtons">
                        <button
                            className={offer ? "formButtonActive" : "formButton"}
                            type="button"
                            id="offer"
                            value={true}
                            onClick={onMutate}
                        >
                            Yes
                        </button>
                        <button
                            className={
                                !offer && offer !== null ? "formButtonActive" : "formButton"
                            }
                            type="button"
                            id="offer"
                            value={false}
                            onClick={onMutate}
                        >
                            No
                        </button>
                    </div>

                    <label className="formLabel">Regular Price</label>
                    <div className="formPriceDiv">
                        <input
                            className="formInputSmall"
                            type="number"
                            id="regularPrice"
                            value={regularPrice}
                            onChange={onMutate}
                            min="50"
                            max="750000000"
                            required
                        />
                        {type === "rent" && <p className="formPriceText">$ / Month</p>}
                    </div>

                    {offer && (
                        <>
                            <label className="formLabel">Discounted Price</label>
                            <input
                                className="formInputSmall"
                                type="number"
                                id="discountedPrice"
                                value={discountedPrice}
                                onChange={onMutate}
                                min="50"
                                max="750000000"
                                required={offer}
                            />
                        </>
                    )}

                    <label className="formLabel">Images</label>
                    <p className="imagesInfo">
                        The first image will be the cover (max 6).
                    </p>
                    <input
                        className="formInputFile"
                        type="file"
                        id="images"
                        onChange={onMutate}
                        max="6"
                        accept=".jpg,.png,.jpeg"
                        multiple
                        required
                    />
                    <button type="submit" className="primaryButton createListingButton">
                        Create Listing
                    </button>
                </form>
            </main>
        </div>
    );
}

export default CreateListing;
