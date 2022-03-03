import * as React from 'react'

interface MyLibraryProps {
    
}
 
interface MyLibraryState {
    
}
 
class MyLibrary extends React.Component<MyLibraryProps, MyLibraryState> {

    render() { 
        return ( 
            <div>
                Hello from My Library 
            </div>
         );
    }
}
 
export default MyLibrary;