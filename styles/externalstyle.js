import { StyleSheet, PixelRatio } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		// marginTop: StatusBar.currentHeight || 0,
		backgroundColor: '#fff',
	},
	slide: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'blue',
	},
	text: {
		color: '#828282',
		textAlign: 'center',
		fontSize: 17
	},	  
	image: {
		width: "15%",
		marginVertical: 0,
		marginHorizontal: 15,
		height: PixelRatio.getPixelSizeForLayoutSize(15),
		padding: 10
	},
	intro_title: {
		fontSize: 25,
		color: '#014c7a',
		textAlign: 'left',
		padding: 20,
		alignSelf: 'flex-start',
		fontFamily: 'Poppins_500Medium'
	},
	title: {
		fontSize: 20,
		color: 'black',
		textAlign: 'left',
		padding: 20,
		alignSelf: 'flex-start',
		fontFamily: 'Poppins_500Medium'
	},
	buttonCircle: {
		width: 44,
		height: 44,
		backgroundColor: 'rgba(0, 0, 0, .2)',
		borderRadius: 22,
		justifyContent: 'center',
		alignItems: 'center'
	},
	news_topline: {
		borderRadius: 13,
		elevation: 5,
		// height: 100,
		flex:1,
		borderWidth: 1,
		borderColor: '#437ab5',
		backgroundColor: "#437ab5",
		marginTop: 20
	},
	inactive_topline: {
		borderRadius: 13,
		elevation: 5,
		// height: 100,
		flex:1,
		borderWidth: 1,
		borderColor: 'grey',
		backgroundColor: "#d4d3cf",
		marginTop: 20
	},
	active_topline: {
		borderRadius: 53,
		elevation: 5,
		// height: 100,
		flex:1,
		borderWidth: 1,
		borderColor: 'green',
		backgroundColor: "#e4f7e5",
		// marginTop: 20
	},	
	homecard : {
		borderRadius: 20,
		elevation: 5,
		marginHorizontal: 10,
		borderColor: '#1dab44',
		backgroundColor: "#e1f7e8",
		marginVertical: 5
	},
	cardimage: {
		flexGrow:1,
		width: "100%",
		height: PixelRatio.getPixelSizeForLayoutSize(50), 
		borderTopLeftRadius: 13, 
		borderTopRightRadius: 13
	},
	dropdown: {
		marginTop: 20,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: '#4287f5',
		backgroundColor: '#ebedeb',
	}
		
});