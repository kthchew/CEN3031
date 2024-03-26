import "./css/Store.css"
import PropTypes from "prop-types";
import loot_box from "./img/UI/lootbox.png"
import store_UI from "./img/UI/store_window.png"
import close_button from "./img/UI/close_button.png"
import adopt_button from "./img/UI/Adopt.png"
import display_frame from "./img/UI/display_frame.png"
import gem_count from "./img/UI/gem_display.png"

export default function Store ({buyLootboxTest, setOverlay, userData}) {
  return(
      <div className="store_container">
        <button className="close_store" onClick={() => setOverlay("home")}>
          <img src={close_button}/>
        </button>
        <div className="gem_display">
          <img src={gem_count}/>
        </div>
        <img src={store_UI}/>
        <div className="display">
          <img src={display_frame} id="display_frame"/>
          <div className="lootbox">
            <img src={loot_box}/>
          </div>
        </div>  
        <div className="adopt">
          <button className="adopt_button">
            <img src={adopt_button}/>
          </button>
        </div>
      </div>
  );
}

Store.propTypes = {
  buyLootboxTest: PropTypes.func,
  setOverlay: PropTypes.func,
  userData: PropTypes.object
}