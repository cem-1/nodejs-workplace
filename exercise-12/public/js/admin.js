const deleteAirport = (btn) => {
        const _id = btn.parentNode.querySelector("[name=_id]").value;
        const csrf = btn.parentNode.querySelector("[name=_csrf]").value;
        const airportElement = btn.closest("article");

        fetch("/airport/" + _id , {
            method: "DELETE",
            headers: {
                "csrf-token" : csrf
            }
        }).then(result => {
            return result.json();
        }).then(data => {
            console.log(data);
            airportElement.parentNode.removeChild(airportElement);
        }).catch(err=> {
            console.log(err);
        });
};