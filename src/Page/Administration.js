import Navigation from '../Component/Basic/Navigation';

export default function Administration() {

    return (
        <div>
            <a href="/parameters" className="text-decoration-none title" style={{ fontSize: "100px"}}>&lt;</a>
            <div class="container">

                <div className="row justify-content-center">
                    <div className="col-6">
                        <>
                        <h2>Activity</h2>
                        <a href="" className="btn btn-primary">Lire tous</a>
                        <a href="/activity/create" className="btn btn-primary">Ajouter</a>
                        </>
                    </div>
                    <div className="col-6">
                        <h2>Place</h2>
                        <a href="/place/readall" className="btn btn-primary">Lire tous</a>
                        <a href="/place/create" className="btn btn-primary">Ajouter</a>
                    </ div>
                </div>
                </div>
            <Navigation />
        </div>
    );
}