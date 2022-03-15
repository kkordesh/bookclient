import * as React from 'react'
import AllBooks from './AllBooks/AllBooks'


interface HomeProps {
    token: string | null
}
 
interface HomeState {
    
}
 
class Home extends React.Component<HomeProps, HomeState> {
  
    render() { 
        return ( 
            <div>
               <h1>Welcome To BookShelf</h1>
                <AllBooks token = {this.props.token}/>
                
            </div>
         );
    }
}
 
export default Home;