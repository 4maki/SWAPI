import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Specie from './pages/Specie';
import { ISpecie } from './helpers/interfaces/ISpecie';
import { TAppState } from './helpers/types/TAppState';
import Home from './pages/Home';
import { getSpecies } from './services/species';
import Navbar from './components/Navbar';

export default class App extends Component<{}, TAppState> {
    state = {
        isLoad: false,
        species: [
            {
                name: '',
                classification: '',
                designation: '',
                language: '',
                people: [],
            },
        ],
    };

    componentDidMount(): void {
        // ako zelimo da doati sve rase onda ostavis prazno, ako oces filtrirat upises mu parametre u getSpecies
        const species: Promise<any> = getSpecies("Human","Droid","Wookie","Rodian","Hutt","Yoda's species");
        species.then((species: Array<ISpecie>) => {
            const isLoad = true;
            this.setState({ isLoad, species });
            console.log(this.state);
        });
    }

    render(): JSX.Element {
        const { isLoad, species } = this.state;
        return (
            <>

            <Routes>
                
                <Route path="/" element={<Home isLoad={isLoad} species={species} />} />
                <Route path="/specie/:specieName"  element={<Specie species={species}/>} />
            </Routes>
            </>
        );
    }
}
