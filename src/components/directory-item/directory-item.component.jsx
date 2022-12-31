import {useNavigate} from "react-router-dom";

import './directory-item.styles.scss'

const DirectoryItem = ({directory}) => {
  const {imageUrl, title} = directory;
  const navigate = useNavigate();
  return (
    <div className="directory-container">
      <div className="background-image" style={{backgroundImage: `url(${imageUrl})`}}/>
      <div className="directory-body-container"
           onClick={() => navigate(`/shop/${title.toLowerCase().replace(/["']/g, '')}`)}>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  )
}

export default DirectoryItem