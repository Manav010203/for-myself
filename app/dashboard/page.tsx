import Appbar from "../components/Appbar";

export default function StreamView(){
    return <div>
        <Appbar/>
        Dashboard
        <div className="flext justify-center col-start-3">
        <input className="text-gray-900 p-2 "></input>
        <div>
        <button className="border p-2 ">submit</button>
        </div>
        </div>
       
        
    </div>
}