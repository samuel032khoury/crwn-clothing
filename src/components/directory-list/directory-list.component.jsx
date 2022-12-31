import './directory-list.styles.scss'
import DirectoryItem from "../directory-item/directory-item.component";

const DirectoryList = ({directories}) => {
  return (
    <div className="directory-list-container">
      {directories.map((directory) => (
        <DirectoryItem key={directory.id} directory={directory}/>
      ))}
    </div>)
}

export default DirectoryList