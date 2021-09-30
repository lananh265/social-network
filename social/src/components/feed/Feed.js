
import Poststatus from "../poststatus/Poststatus";
import "./feed.css";
import Status from "../status/status";

export default function Feed() {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Poststatus />
        {/* {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))} */}
        <Status />
      </div>
    </div>
  );
}
