import React, {useEffect,  } from 'react';
import { WebView } from 'react-native-webview';

import { useIsFocused } from '@react-navigation/native';

function SearchHCP({route,navigation}) {
    let WebViewRef;
    const isFocused = useIsFocused();
    const specialist_id = route.params.specialist_id;
  
    useEffect(() => {
      async function ReloadWebView(){
          WebViewRef && WebViewRef.reload();
      }
      ReloadWebView();
    },[isFocused]);
    
    return(
        <WebView
          ref={WEBVIEW_REF => (WebViewRef = WEBVIEW_REF)}
          source={{ uri: `https://912e879c5fcf.ngrok.io/search.html` }}
          startInLoadingState={true}
        />
    )
  }

export default SearchHCP;