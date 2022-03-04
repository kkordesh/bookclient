import * as React from 'react'
import AllBooks from './AllBooks/AllBooks'
import BookCategory from './BookCategory/Bookcategory'

interface HomeProps {
    token: string | null
}
 
interface HomeState {
    
}
 
class Home extends React.Component<HomeProps, HomeState> {
  
    render() { 
        return ( 
            <div>
                hello from home
                <AllBooks token = {this.props.token}/>
                <BookCategory />
            </div>
         );
    }
}
 
export default Home;