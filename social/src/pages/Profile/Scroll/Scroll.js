import { Fragment } from 'react';
import ScrollButton from './ScrollButton';
import { Content, Header } from './Styles';
	
function Scroll() {
return (
	<Fragment>
	<Header>GeeksForGeeks Scroll To Bottom</Header>
	<ScrollButton />
	<Content />
	<Header>Thanks for visiting</Header>
	</Fragment>
);
}
	
export default Scroll;
