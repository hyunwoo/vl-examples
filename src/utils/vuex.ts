export const set = (property: any) => (state, payload) => (state[property] = payload);
export const toggle = (property: any) => state => (state[property] = !state[property]);
