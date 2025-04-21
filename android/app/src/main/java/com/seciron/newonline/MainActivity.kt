package com.seciron.newonline
import expo.modules.splashscreen.SplashScreenManager

import android.os.Build
import android.os.Bundle

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

import expo.modules.ReactActivityDelegateWrapper

class MainActivity : ReactActivity() {

  companion object {
    lateinit var DEVINFO: JSONObject
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    // Set the theme to AppTheme BEFORE onCreate to support
    // coloring the background, status bar, and navigation bar.
    // This is required for expo-splash-screen.
    // setTheme(R.style.AppTheme);
    // @generated begin expo-splashscreen - expo prebuild (DO NOT MODIFY) sync-f3ff59a738c56c9a6119210cb55f0b613eb8b6af
    SplashScreenManager.registerOnActivity(this)
    // @generated end expo-splashscreen
    super.onCreate(null)
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "main"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return ReactActivityDelegateWrapper(
          this,
          BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
          object : DefaultReactActivityDelegate(
              this,
              mainComponentName,
              fabricEnabled
          ){})
  }

  /**
    * Align the back button behavior with Android S
    * where moving root activities to background instead of finishing activities.
    * @see <a href="https://developer.android.com/reference/android/app/Activity#onBackPressed()">onBackPressed</a>
    */
  override fun invokeDefaultOnBackPressed() {
      if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
          if (!moveTaskToBack(false)) {
              // For non-root activities, use the default implementation to finish them.
              super.invokeDefaultOnBackPressed()
          }
          return
      }

      // Use the default back button implementation on Android S
      // because it's doing more than [Activity.moveTaskToBack] in fact.
      super.invokeDefaultOnBackPressed()
  }
}

private fun registerSecurityEventCallback(){
  RiskStubAPI.initEventResponse(this)

  RiskStubAPI.registerService(object: CallBack {
    override fun onResult(type: Type, result: Any) {
      val jsonObject =  result as JSONObject
      val responseI18n = jsonObject.optString("responseI18n")
      val key = jsonObject.optString("key")

      Log.d("responseI18n", responseI18n)
      Log.d("ruleengine", "onReceive:$key")

      val responseType = jsonObject.optInt("responseType", -1)
    }
  }, Type.RISKEVENT, 0.5)
}

private fun registerDeviceInfoCallback() {
  RiskStubAPI.registerService(object: CallBack {
    override fun onResult(type: Type, result: Any) {
      val jsonObject = result as JSONObject

      DEVINFO = jsonObject

    }
  }, DEVINFO, 0.5)
}

private fun initializeRiskStubAPI() {
  val key = "+a88XBOU/bvfk6al7Sliekw/mW7CO7nMaHAXk44fM5pI/HI+Q3wuIMHkZpB7e2/MHChuvKlm+9ca1F6Pc+oIEe05hLToa3V5jysIMJ9OLDAbxhQEavEiURX3offMH8N6L4X6JfOo1a1gtus8bCMWwyhPO9rigy12M2l0trMI8DcNEvptYtHb3lK8/SMV35bZePbSmWvKesTTHzLzAGXOqqHN4vjhSXUfIwZBUR+wgFuUuS3xRMyTDbpT43Ei5+eb"

  val isInit = RiskStubAPI.initAppsecEverisk(this, key)
  Log.d("Status", "is init everisk:  $isInit")
}

private fun setUserID(userID: String): String? {
  return try {
    RiskStubAPI.setUserId(this, userID)
    "success"

  } catch (e: Exception) {
    Log.e("nativeFunction",  "Error setting user ID", e)
    null
  }
}

override fun onCreate(savedInstanceState: Bundle?) {
  super.onCreate(savedInstanceState)

  registerSecurityEventCallback()
  registerDeviceInfoCallback
  setUserID("Custom_USER_ID")
  initializeRiskStubAPI()
}
