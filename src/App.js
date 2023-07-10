import axios from 'axios';
import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';
import { useQuery } from '@tanstack/react-query';

function App() {
    // useEffect(() => {
    //     fetchApi();
    // }, []);

    const fetchApi = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`);
        return res.data;
    };

    const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi });
    console.log(query);
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.page;

                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
