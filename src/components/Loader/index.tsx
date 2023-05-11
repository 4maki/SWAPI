import "./index.scss";

const Loader =():JSX.Element=>{
return(
    <>
    <div className = "loader-container">
    <div className="lds-hourglass"></div>
    </div>
    </>
)
}
export default Loader;