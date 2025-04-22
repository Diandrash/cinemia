package com.seciron.newonline

import android.os.Build
import android.os.Bundle
import android.util.Log
import org.json.JSONObject // ✅ Tambahkan ini
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import expo.modules.ReactActivityDelegateWrapper
import expo.modules.splashscreen.SplashScreenManager

// ✅ Import API dari vendor SDK kamu
import com.seciron.riskapi.RiskStubAPI
import com.seciron.riskapi.CallBack
import com.seciron.riskapi.Type

class MainActivity : ReactActivity() {

  companion object {
    lateinit var DEVINFO: JSONObject
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    SplashScreenManager.registerOnActivity(this)
    super.onCreate(null)

    registerSecurityEventCallback()
    registerDeviceInfoCallback()
    setUserID("Custom_USER_ID")
    initializeRiskStubAPI()
  }

  override fun getMainComponentName(): String = "main"

  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return ReactActivityDelegateWrapper(
      this,
      BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
      object : DefaultReactActivityDelegate(
        this,
        mainComponentName,
        fabricEnabled
      ) {}
    )
  }

  override fun invokeDefaultOnBackPressed() {
    if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
      if (!moveTaskToBack(false)) {
        super.invokeDefaultOnBackPressed()
      }
      return
    }
    super.invokeDefaultOnBackPressed()
  }

  // ✅ Semua helper function kamu pindah ke dalam class

  private fun registerSecurityEventCallback() {
    RiskStubAPI.initEventResponse(this)

    RiskStubAPI.registerService(object : CallBack {
      override fun onResult(type: Type, result: Any) {
        val jsonObject = result as JSONObject
        val responseI18n = jsonObject.optString("responseI18n")
        val key = jsonObject.optString("key")

        Log.d("responseI18n", responseI18n)
        Log.d("ruleengine", "onReceive:$key")

        val responseType = jsonObject.optInt("responseType", -1)
      }
    }, Type.RISKEVENT, 0.5)
  }

  private fun registerDeviceInfoCallback() {
    RiskStubAPI.registerService(object : CallBack {
      override fun onResult(type: Type, result: Any) {
        val jsonObject = result as JSONObject
        DEVINFO = jsonObject
      }
    }, Type.DEVICEINFO, 0.5)
  }

  private fun initializeRiskStubAPI() {
    val key = "+a88XBOU/bvfk6al7Sliekw/mW7CO7nMaHAXk44fM5pI/..." // Potong untuk keamanan
    val isInit = RiskStubAPI.initAppsecEverisk(this, key)
    Log.d("Status", "is init everisk:  $isInit")
  }

  private fun setUserID(userID: String): String? {
    return try {
      RiskStubAPI.setUserId(this, userID)
      "success"
    } catch (e: Exception) {
      Log.e("nativeFunction", "Error setting user ID", e)
      null
    }
  }
}
