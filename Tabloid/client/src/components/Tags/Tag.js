const Tag = ({ tag }) => {
    return (
      <div className="tag-container">
        <p>{tag.name}</p>
        <div className="tag-buttons-container">
        <button className="edit-button">Edit</button>
        <button className="delete-button">Delete</button>
    </div>
    </div>
    
    );
  };
  
  export default Tag;