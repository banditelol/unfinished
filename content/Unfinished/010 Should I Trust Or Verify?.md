---
publish: true
tags:
  - unfinished
  - SSL
  - Python
  - Community
date: 2024-07-10
created_date: 2024-07-10
---
# On Trust and Verify?
Recently I came across a question in `Pelajar Data` Discord Server, someone is trying to access a website programmatically using python requests package but always face `SSLError` :(
```
(Caused by SSLError(SSLCertVerificationError(1, '[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1122)')))
```

seeing this, my first reaction is:
> It seems okay to not verify the certificate when developing? Especially when we only do `GET` requests, so just use `verify=False` in `requests`

After letting it sits for a while I still stand by that first reaction, but I started thinking "When I want to start doing it for real, what should I do then?". And at that time I don't have satisfying answer for that. So I dip my feet a bit in this issue. So let us reproduce it first!

## It Works on My Machine! (It's Not)
I kinda hope that it's DNS related issue or network related one and it works on my machine. But it's not, using both python `requests` and `httpx` I get similar result

```python
try:
    requests.get("https://cekbpom.pom.go.id/")
except requests.exceptions.SSLError:
    print("Cert not found")
# Cert not Found

try:
    httpx.get("https://cekbpom.pom.go.id/")
except httpx.ConnectError as e:
    print("Cert not found")
# Cert not found
```

also I thought that the issue is on the website side, so I tried it with curl too and I got the following

```bash
curl -s -o /dev/null -w "%{http_code}" https://cekbpom.pom.go.id
# 200
```

Wait, it works?

So the problem probably on the python side of things. What again is the error?

## Unable to Get Local Issuer Certificate
What does it even mean? My superficial understanding on how SSL Work is the following:
1. Client send requests to a server asking for their certificate
2. Server response with their certificate chain
3. Client verify the certificate chain by consulting local certificate bundle
4. If the issuer is trusted by client's local certificate bundle, then the verification will succeed

So the above error means that local certificate bundle used by python doesn't trust `https://cekbpom.pom.go.id` issuer. What can we do to solve this? We need to decide whether we should trust the issuer or not, and what's the implication of trusting this issuer. And how should we do that? IDK ¯\\_(ツ)_/¯

>I really appreciate if someone with good knowledge on this topic could help me understand this better, please reach me out on my [twitter](https://twitter.com/banditelolrp)

## Okay I'll Verify the Issuer Later, Now I Trust!
While this raise a question in my mind, whether trusting an issuer without proper verification is better than setting `verify=False` in python. But it should at least better right? Assuming so, how do we go with trusting this issuer?
We first need to download the certificate, in chrome its quite easy
![[2024-07-10 at 19.37.39 - Coral Smelt.mp4]]
Having the `.pem` file, we just need to refer it when we call the requests. For example we save it in `../data/_.pom.go.id.pem`, we just need to call requests and passing the certificate path to `verify` as argument:

```python
res = requests.get("https://cekbpom.pom.go.id", verify=r"../data/_.pom.go.id.pem")
print(res.status_code)
# 200
```
Voila!

## Additional Readings
- [Found this more comprehensive and informative answer from SO](https://stackoverflow.com/questions/39356413/how-to-add-a-custom-ca-root-certificate-to-the-ca-store-used-by-pip-in-windows)