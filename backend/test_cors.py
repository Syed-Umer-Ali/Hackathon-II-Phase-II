import requests

print("Testing CORS...")
try:
    response = requests.options(
        "http://127.0.0.1:8000/api/v1/register",
        headers={
            "Origin": "http://localhost:3000",
            "Access-Control-Request-Method": "POST",
        }
    )
    print(f"Status Code: {response.status_code}")
    print("Headers:", response.headers)
    
    if "Access-Control-Allow-Origin" in response.headers:
        print("CORS SUCCESS: Access-Control-Allow-Origin header present.")
    else:
        print("CORS FAILURE: Missing Access-Control-Allow-Origin header.")

except Exception as e:
    print(f"Request failed: {e}")
