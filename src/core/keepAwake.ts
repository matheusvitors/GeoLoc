import { activateKeepAwake, deactivateKeepAwake } from "@sayem314/react-native-keep-awake";

export const KeepAwake = {
    activate: () => {
        activateKeepAwake();
    },

    deactivate: () => {
        deactivateKeepAwake();
    }
}