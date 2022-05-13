import { API, CozytouchLoginHandler, Setup } from "overkiz-api";

async function fetchAllHouse(): Promise<Setup> {
    const api: API = new API({
        host: 'ha110-1.overkiz.com',
        platformLoginHandler: new CozytouchLoginHandler(
            'xxx',
            'xxx'
        ),
        polling: {
            always: false,
            interval: 1000
        }
    });
    return api.getSetup();
}

// FIXME: how to autodiscover this?
const devices = {
    "Parents": "IO (11671469#3)",
    "Couloir": "IO (11671469#5)",
    "Clément": "IO (11671469#7)",
    "Damien": "IO (11671469#9)"
}
const device_label = "Parents"

function getTemperatureState(json, label: string) {
    const value;
    json.devices.forEach(element => {        
        if (element.name === devices[label])
        {
            element.states.forEach(state => {
                if (state.name === 'core:TemperatureState')
                {
                    value = state.value
                }
            });
        }
    })
    return value
}

function getTargetTemperatureState(json, label: string) {
    const value;
    json.devices.forEach(element => {
        if (element.name === label)
        {
            element.states.forEach(state => {
                if (state.name === 'core:TargetTemperatureState')
                {
                    value = state.value
                }
            });
        }
    });
    return value
}

fetchAllHouse()
.then(json => {
    console.log(getTemperatureState(json, device_label))
    console.log(getTargetTemperatureState(json, device_label))
})
.catch(console.error)
