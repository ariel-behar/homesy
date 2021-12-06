import styles from './Home.module.css';
import typesOfServices from "../../data/typesOfServices.json";
import SelectOptions from '../HomeServices/Create/SelectOptions/SelectOptions.js';
import { useContext } from 'react';
import ErrorContext from '../../contexts/ErrorContext.js';
import * as homeServicesService from '../../services/homeServicesService.js';

const Home = () => {
    const { displayError } = useContext(ErrorContext);

    const onFormSubmitHanlder = async (e) => {
        e.preventDefault();

        // TODO: THis part needs to be modified and all of the ones along the request chain

        // const { typeOfService, cityOfOperation } = Object.fromEntries(new FormData(e.currentTarget));

        // try {
        //     let result = await homeServicesService.get(typeOfService, cityOfOperation);
        //     console.log('result:', result)

        // } catch(error) {
        //     displayError(await error);
        // }

    }

    return (
        <section className={styles.homePageSection}>
            <p>Services</p>
            <form method="GET" action="" onSubmit={onFormSubmitHanlder}>
                <select name="typeOfService" id="serviceType">
                    {typesOfServices.map(x => {
                        return (
                            <SelectOptions key={x._id} value={x.value}>
                                {x.name}
                            </SelectOptions>
                        );
                    })}
                </select>
                <input type="text" name="cityOfOperation" placeholder="Where?" />
                <input type="submit" />
            </form>
        </section>
    );
};

export default Home;
