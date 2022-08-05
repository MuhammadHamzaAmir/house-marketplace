import {Link} from 'react-router-dom';
import {ReactComponent as DeleteIcom} from '../assets/svg/deleteIcon.svg';
import bathtubIcon from '../assets/svg/bathtubIcon.svg';
import bedIcon from '../assets/svg/bedIcon.svg';


function ListingItem(props) {



    return (
      <li className="categoryListing">
        <Link
          to={`/category/${props.listing.type}/${props.id}`}
          className="categoryListingLink"
        >
          <img
            src={props.listing["imageUrls"][0]}
            alt={props.listing.name}
            className="categoryListingImg"
          />
          <div className="categoryListingDetails">
            <p className="categoryListingLocation">{props.listing.location}</p>
            <p className="categoryListingName">{props.listing.name}</p>
            <p className="categoryListingPrice">
              $
              {props.listing.offer
                ? props.listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : props.listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                {props.listing.type === 'rent' ? ' / Month' : ''}
            </p>
            <div className="categoryListingInfoDiv">
                <img src={bedIcon} alt="beds"/>
                <p className="categoryListingInfoText">{props.listing.bedrooms === 1 ? `1 Bedroom` : `${props.listing.bedrooms} bedrooms` }</p>
                <img src={bathtubIcon} alt="beth rooms"/>
                <p className="categoryListingInfoText">{props.listing.bathrooms === 1 ? `1 Bathroom` : `${props.listing.bathrooms} bathrooms` }</p>
            </div>
          </div>
        </Link>

        {props.onDelete && (
            <DeleteIcom fill='rgb(231,76,61)' className='removeIcon' onClick={() => props.onDelete(props.listing.id,props.listing.name)}></DeleteIcom>
        )}
      </li>
    );
}

export default ListingItem