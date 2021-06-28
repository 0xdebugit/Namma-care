import React, {useEffect,  } from 'react';
import { WebView } from 'react-native-webview';

import { useIsFocused } from '@react-navigation/native';

function HCPList({route,navigation}) {
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
          source={{ uri: `https://ikshh.org/hcl_sdk_web/search.html#sp=${specialist_id}` }}
          startInLoadingState={true}
        />
    )
  }

export default HCPList;