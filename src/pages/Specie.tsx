import { useEffect, useState } from 'react';
import { Params, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import SpecieTable from '../components/Species/SpecieTable';
import { API_VEHICLES } from '../helpers/constants/swapiEndpoints';
import { ISpecie } from '../helpers/interfaces/ISpecie';
import { TSpecies } from '../helpers/types/TSpecies';
import { getUser } from '../services/users';
import { getVehicles } from '../services/vehicles';

const Specie = ({ species }: TSpecies): JSX.Element => {
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const [specieName, setSpecieName] = useState<string | undefined>('');
    const [userName, setUserName] = useState<string | undefined>('');
    const [specieVehicles, setSpecieVehciles] = useState<Array<object> | undefined>();

    const params: Params<string> = useParams();
    useEffect(() => {
        setIsLoad(false);
        const specie: ISpecie | undefined = species.find(({ name }) => name.toLowerCase() === params.specieName);

        const userUrl: string = specie?.people ? specie.people[0] : '';
        setSpecieName(specie?.name);

        let specieVehiclesUrl: string = getSpecieVehiclesUrl(specie);

        if (userUrl && specieVehiclesUrl) {
            getUserAndVehiclesAndSpecieVehiclesData(userUrl, specieVehiclesUrl);
        } else if (userUrl) {
            getUserData(userUrl);
        }
    }, [params]);

    const getSpecieVehiclesUrl = (specie: ISpecie | undefined) => {
        switch (specie?.name) {
            case 'Human':
                return API_VEHICLES;
            case 'Droid':
                return API_VEHICLES + '?search=droid';
            case 'Wookie':
                return API_VEHICLES + '?search=wookie';
            default:
                return '';
        }
    };

    const getUserAndVehiclesAndSpecieVehiclesData = (userUrl: string, specieVehiclesUrl: string) => {
        const data: Promise<any> = Promise.all([getUser(userUrl), getVehicles(specieVehiclesUrl)]);
        data.then((result: Array<any>) => {
            // izvlacis 0 jer je tamo name
            setUserName(result[0]);
            setSpecieVehciles(result[1]);
        })
            .catch(() => {
                console.error('Nesto nije u redu');
                // lovimo greske ako ih ima na krovnom promisu
            })
            // finally se uvik izvrsava neovisno o then catch stagod se izvrsilo od to dvoje
            .finally(() => {
                setIsLoad(true);
            });
    };
    const getUserData = (userUrl: string | undefined) => {};

    return (
        <>
            <SpecieTable isLoad={isLoad} specieName={specieName} userName={userName} specieVehicles={specieVehicles} />
        </>
    );
};
export default Specie;
