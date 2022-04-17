import ToasterNotification from 'components/Toaster';
import CustomRoute from 'router/Routes';

function App() {
    return (
        <div className="App">
            <CustomRoute />
            <ToasterNotification 
                position='top-right'
                reverseOrder={true}
            />
        </div>
    );
}

export default App;
