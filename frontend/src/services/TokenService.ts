import { IToken } from "../models/IToken"

class TokenService {
    setTokens(tokens: IToken) {
            localStorage.setItem("access", tokens?.access ? tokens.access : "")
            localStorage.setItem("refresh", tokens?.refresh ? tokens.refresh : "")
        }
    
        removeTokens() {
            localStorage.removeItem("access")
            localStorage.removeItem("refresh")
        }
    
        getLocalRefreshToken() {
            return localStorage.getItem("refresh")
        }
    
        getLocalAccessToken() {
            return localStorage.getItem("access")
        }
    
        updateLocalAccessToken(accessToken: string) {
            localStorage.setItem("access", accessToken)
        }
    }
    
export const tokenService = new TokenService()
