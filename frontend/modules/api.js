const API_BASE_URL = "https://localhost:7092/api";

export async function LoadFilms(){    
    try{
        const res = await fetch(`${API_BASE_URL}/movies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const genreRes = await fetch(`${API_BASE_URL}/genres`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        // const loggedUser=await fetch(`${API_BASE_URL}/users`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         credetials: 'include'
        //     },
        // });
        if(!res.ok){
            throw new Error('Failed to load films');
        }
        if(!genreRes.ok){
            throw new Error('Failed to load genres');
        }
        // if(!loggedUser.ok){
        //     throw new Error('Failed to load user');
        // }
        const films=await res.json();
        const genres=await genreRes.json();
        //const user=await loggedUser.json();

        localStorage.setItem("films", JSON.stringify(films));
        localStorage.setItem("genres", JSON.stringify(genres));
        //localStorage.setItem("user", JSON.stringify(user));
        
        window.location.href = './pages/landing.html';
    }
    catch(err){
        console.log(err);
    }
}