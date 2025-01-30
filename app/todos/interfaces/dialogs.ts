export interface CreateState {
    create: boolean 
}

export interface DeleteState {
    delete: boolean 
    id: string
  }
  
  export interface EditState {
    edit: boolean 
    id?: string 
  }