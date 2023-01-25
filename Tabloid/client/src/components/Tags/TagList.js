import React, { useState, useEffect } from "react";
import { getAllTags } from "../../modules/tagManager";
import Tag from "./Tag";

const TagList = () => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    getTags();
}, []);

const getTags = () => {
    getAllTags().then(tags => setTags(tags));
};
  
    return (
      <div className="container">
        <div className="row justify-content-center">
        <p><b>All Tags:</b></p>
          {tags.map((tag) => (
            <Tag tag={tag} key={tag.id}/>
          ))}
        </div>
        <br></br>
        <form>
      <input
        type="text"
        placeholder="Add a new tag"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
      </div>
    );
  };
  
export default TagList