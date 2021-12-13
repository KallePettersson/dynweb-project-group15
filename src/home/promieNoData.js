function PromiseNoData(promise, data, error, preventLoadingGif=false) {

    if (!promise) {
        return <span>no data</span>
    } else {
        
        //case 2
        if (!data && !error) {
            if (preventLoadingGif) {
               return <div></div>; 
            }
            return <img src={"http://www.csc.kth.se/~cristi/loading.gif"}/>
        }
        //case 3
        if (!data && error) {
            return <span>{error}</span>
        }
        //case 4
        if (data && !error) {
            return false;
        }

    }


}

export default PromiseNoData;