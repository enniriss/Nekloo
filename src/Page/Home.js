import SwitchButton from "../Component/Basic/SwitchButton";
import CustomMap from "../Component/Basic/CustomMap";
import MapLive from "../Component/MainComponent/MapLive";
function Home() {
  return (
    <div class="">
      <div class="row">
        <div class="col-md-12 col-lg-6 b-0 vh-100 h-100 d-flex flex-column align-items-center justify-content-center position-relative py-5 overflow-hidden d-none d-lg-block">
          <h1>Bienvenue sur Nekloo !</h1>
          <SwitchButton />
        </div>
        <div class="col-md-12 col-lg-6 p-0 b-0" >
          <MapLive />
        </div>
      </div>

    </div>
  );
}
export default Home;
