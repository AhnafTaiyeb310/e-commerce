import { api } from "@/lib/api"

export const getMe = async ()=> {
    try{
        const { data } = await api.get("/api/auth/user/");
        return data
    } catch (err) {
        if(err?.response?.status === 401){
            return null
        }
        throw err;
    }
}

export const loginRequest = async (credentials)=> {
    const { data } = await api.post("/api/auth/login/", credentials)
    return data
}

export const signupRequest = async (credentials)=> {
    const { data } = await api.post("/api/auth/registration/", credentials);
    return data
}

export const LogoutRequest = async ()=> {
    const { data } = await api.post("/api/auth/logout/")
    return data
}

export const verifyEmailRequest = async (key)=> {
    const { data } = await api.post(
      "/api/auth/registration/verify-email/",
      { key },
    ); 
    return data;
}