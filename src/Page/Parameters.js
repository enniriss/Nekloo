import Navigation from "../Component/Basic/Navigation";
import Background from "../Component/Basic/Background";
import ActionButton from "../Component/Basic/ActionButton";

export default function Parameters() {
    const userRole = localStorage.getItem('role');

    return (
        <div className="p-0 b-0 row position-relative overflow-hidden">
            <Background/>
            <div className="pt-0 b-0 m-0 overflow-hidden">
                <div className="b-0 m-0 vh-100 h-100 py-5 overflow-hidden">
                    <div className="d-flex justify-content-center gap-3">
                        <div className="d-flex flex-column gap-3">
                            {userRole === "admin" ? (
                                <ActionButton title="Supposition" href="/supposition/readall" img="/assets/lampe.png" widthImg="70em"  id="supposition"
                                imgStyle={{position: "absolute", left: "10%", transform: "translate(0%, 0%)", bottom: "8%"}}
                                h1Style={{position: "absolute", right: "0%", bottom:"50%", transform: "translate(0%, 50%)"}}/>
                            ) : (
                                <ActionButton title="Supposition" href="/supposition/readmine" img="/assets/lampe.png" widthImg="70em"  id="supposition"
                                imgStyle={{position: "absolute", left: "10%", transform: "translate(0%, 0%)", bottom: "8%"}}
                                h1Style={{position: "absolute", right: "0%", bottom:"50%", transform: "translate(0%, 50%)"}}/>
                            )
                        }

                            <ActionButton title="Avis" img="/assets/avis.png" height="40vw" widthImg="100em"
                                imgStyle={{position: "absolute", left: "50%", transform: "translate(-50%, 5%)", bottom: "0%"}}/>
                        </div>
                        <div className="d-flex flex-column gap-3">
                            <ActionButton title="Profil" img="/assets/user.png" height="17rem" widthImg="100em" href="/account"
                                imgStyle={{position: "absolute", left: "50%", transform: "translate(-50%, -30%)", bottom: "0%"}}
                                h1Style={{position: "absolute", left: "50%", transform: "translate(-50%, 0%)", top:"15%"}}/>
                            
                            {userRole === "admin" ? (
                                <ActionButton title="Para" img="/assets/admin.png" height="40vw" widthImg="80rem" href="/administration"
                                imgStyle={{position: "absolute", left: "50%", transform: "translate(-50%, -60%)", top: "45%"}}
                                h1Style={{position: "absolute", left: "50%", bottom: "0%", transform: "translate(-50%, 19%)"}}/>
                            ) : (
                                <ActionButton title="Like" img="/assets/like.png" height="40vw" widthImg="80rem"
                                imgStyle={{position: "absolute", left: "50%", transform: "translate(-50%, -60%)", top: "45%"}}
                                h1Style={{position: "absolute", left: "50%", bottom: "0%", transform: "translate(-50%, 19%)"}}/>
                            )}
                        </div>
                    </div>
                    <Navigation />
                </div>
                </div>
            </div>
    );
}