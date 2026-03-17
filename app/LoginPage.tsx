"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Manrope, Inter } from "next/font/google";
import Image from "next/image";

const heading = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-heading" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mimic previous changes: simulate loading then redirect to /home
    setTimeout(() => {
      setLoading(false);
      router.push("/home");
    }, 1200);
  };

  return (
    <div className={`${heading.variable} ${body.variable}`} style={{ minHeight: "100vh", display: "flex", fontFamily: "var(--font-body),sans-serif" }}>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

        .left {
          width:55%;position:relative;background:#050508;
          display:flex;align-items:center;justify-content:center;
          overflow:hidden;
        }
        .left::before {
          content:'';position:absolute;inset:0;
          background:
            radial-gradient(ellipse 60% 50% at 30% 30%,rgba(124,58,237,0.35) 0%,transparent 60%),
            radial-gradient(ellipse 50% 60% at 75% 70%,rgba(16,185,129,0.18) 0%,transparent 55%),
            radial-gradient(ellipse 40% 40% at 60% 20%,rgba(59,130,246,0.2) 0%,transparent 50%);
        }
        .left::after {
          content:'';position:absolute;inset:0;
          background-image:linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px);
          background-size:44px 44px;
        }
        .left-inner{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;text-align:center;padding:80px 56px;}

        .tag{
          display:inline-flex;align-items:center;gap:6px;
          border:1px solid rgba(124,58,237,0.4);background:rgba(124,58,237,0.1);
          border-radius:100px;padding:5px 14px;
          font-size:11px;font-weight:600;letter-spacing:.1em;
          color:rgba(167,139,250,0.9);text-transform:uppercase;
          margin-bottom:20px;animation:up .8s cubic-bezier(.16,1,.3,1) both;
        }
        .tag-dot{width:6px;height:6px;border-radius:50%;background:#7c3aed;box-shadow:0 0 6px #7c3aed;}

        .logo-outer{position:relative;width:176px;height:176px;margin-bottom:40px;animation:up .8s cubic-bezier(.16,1,.3,1) .04s both;}
        .logo-outer::before{
          content:'';position:absolute;inset:-3px;border-radius:50%;
          background:linear-gradient(135deg,rgba(124,58,237,0.9),rgba(59,130,246,0.7),rgba(16,185,129,0.5));
          filter:blur(8px);opacity:.7;
        }
        .logo-circle{
          position:relative;width:100%;height:100%;border-radius:50%;
          background:#fff;overflow:hidden;
          display:flex;align-items:center;justify-content:center;
          border:3px solid rgba(255,255,255,0.9);
        }

        .lh1{
          font-family:var(--font-heading),sans-serif;
          font-size:clamp(28px,2.8vw,40px);font-weight:800;line-height:1.15;
          letter-spacing:-.03em;color:#fff;margin-bottom:16px;
          animation:up .8s cubic-bezier(.16,1,.3,1) .1s both;
        }
        .lh1 em{
          font-style:normal;
          background:linear-gradient(135deg,#a78bfa,#60a5fa,#34d399);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;
        }
        .lp{font-size:14px;color:rgba(255,255,255,.38);line-height:1.8;max-width:300px;animation:up .8s cubic-bezier(.16,1,.3,1) .15s both;}

        .stats{display:flex;gap:32px;margin-top:40px;animation:up .8s cubic-bezier(.16,1,.3,1) .2s both;}
        .stat{display:flex;flex-direction:column;align-items:center;gap:3px;}
        .stat-n{font-family:var(--font-heading),sans-serif;font-size:20px;font-weight:800;color:#fff;}
        .stat-l{font-size:10px;color:rgba(255,255,255,.3);letter-spacing:.08em;text-transform:uppercase;}
        .stat-sep{width:1px;background:rgba(255,255,255,.08);align-self:stretch;}

        .right{
          width:45%;
          background:linear-gradient(160deg,#0d0d1a 0%,#0a0a14 100%);
          display:flex;align-items:center;justify-content:center;
          padding:80px 64px;position:relative;overflow:hidden;
        }
        .right::before{
          content:'';position:absolute;
          width:400px;height:400px;border-radius:50%;
          background:radial-gradient(circle,rgba(124,58,237,0.08) 0%,transparent 70%);
          bottom:-100px;right:-80px;pointer-events:none;
        }
        .form-box{width:100%;max-width:340px;animation:up .8s cubic-bezier(.16,1,.3,1) .08s both;}

        .ft{font-family:var(--font-heading),sans-serif;font-size:26px;font-weight:800;color:#fff;letter-spacing:-.025em;margin-bottom:6px;}
        .fs{font-size:13px;color:rgba(255,255,255,.35);margin-bottom:32px;line-height:1.6;}
        .fdiv{height:1px;background:rgba(255,255,255,.07);margin-bottom:28px;}

        .field{margin-bottom:16px;}
        .flbl{font-size:11px;font-weight:600;color:rgba(255,255,255,.4);letter-spacing:.08em;text-transform:uppercase;display:block;margin-bottom:8px;}
        .fi-wrap{position:relative;}
        .fi-wrap > svg{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:rgba(255,255,255,.22);pointer-events:none;}
        .fi{
          width:100%;height:48px;
          background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:12px;
          padding:0 16px 0 44px;font-size:14px;color:#fff;
          font-family:var(--font-body),sans-serif;outline:none;
          transition:border-color .2s,background .2s,box-shadow .2s;
        }
        .fi:focus{border-color:rgba(124,58,237,.7);background:rgba(124,58,237,.08);box-shadow:0 0 0 4px rgba(124,58,237,.12);}
        .fi::placeholder{color:rgba(255,255,255,.18);}

        .pw-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;}
        .forgot{font-size:11px;font-weight:600;color:#a78bfa;text-decoration:none;letter-spacing:.04em;}
        .eye{position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:rgba(255,255,255,.25);padding:8px;display:flex;align-items:center;justify-content:center;transition:color .2s;}
        .eye:hover{color:rgba(255,255,255,0.5);}

        .cta{
          width:100%;height:50px;margin-top:8px;
          background:linear-gradient(135deg,#7c3aed,#6d28d9);
          border:none;border-radius:12px;color:#fff;
          font-size:14px;font-weight:700;font-family:var(--font-body),sans-serif;
          cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;
          letter-spacing:.02em;position:relative;overflow:hidden;
          box-shadow:0 8px 24px rgba(124,58,237,.45),inset 0 1px 0 rgba(255,255,255,.15);
          transition:transform .15s,box-shadow .15s;
        }
        .cta::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.12),transparent 60%);}
        .cta:hover{transform:translateY(-2px);box-shadow:0 14px 32px rgba(124,58,237,.6),inset 0 1px 0 rgba(255,255,255,.15);}
        .cta:active{transform:scale(.99);}
        .cta:disabled{opacity:.6;cursor:not-allowed;transform:none;}
        .cta>*{position:relative;z-index:1;}

        .trust-row{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:24px;}
        .tdot{width:5px;height:5px;border-radius:50%;background:#10b981;box-shadow:0 0 6px rgba(16,185,129,.6);}
        .ttxt{font-size:11px;color:rgba(255,255,255,.22);font-weight:500;}

        @keyframes up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @media(max-width:768px){.left{display:none!important}.right{width:100%!important}}
      `}</style>

      {/* LEFT */}
      <div className="left">
        <div className="left-inner">
          <div className="tag"><span className="tag-dot" />&nbsp;Sales Portal</div>
          <div className="logo-outer">
            <div className="logo-circle">
              <Image src="/logo.png" alt="Codegnan" width={150} height={150} style={{ objectFit: "contain" }} priority />
            </div>
          </div>
          <h1 className="lh1">Elevate your<br /><em>daily workflow.</em></h1>
          <p className="lp">The professional hub powering Codegnan's daily operations and learning excellence.</p>
          <div className="stats">
            <div className="stat"><span className="stat-n">12K+</span><span className="stat-l">Students</span></div>
            <div className="stat-sep" />
            <div className="stat"><span className="stat-n">98%</span><span className="stat-l">Placement</span></div>
            <div className="stat-sep" />
            <div className="stat"><span className="stat-n">800+</span><span className="stat-l">Partners</span></div>
            <div className="stat-sep" />
            <div className="stat"><span className="stat-n">3</span><span className="stat-l">Locations</span></div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="right">
        <div className="form-box">
          <h2 className="ft">Welcome back</h2>
          <p className="fs">Sign in to your Codegnan workspace</p>
          <div className="fdiv" />
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="flbl">Email</label>
              <div className="fi-wrap">
                <input className="fi" type="email" placeholder="you@codegnan.com" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              </div>
            </div>
            <div className="field" style={{ marginBottom: 24 }}>
              <div className="pw-row">
                <label className="flbl" style={{ marginBottom: 0 }}>Password</label>
                <a href="#" className="forgot">Forgot?</a>
              </div>
              <div className="fi-wrap" style={{ marginTop: 8 }}>
                <input className="fi" type={showPassword ? "text" : "password"} placeholder="••••••••••••" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" style={{ paddingRight: 44 }} />
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                <button type="button" className="eye" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword
                    ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                    : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  }
                </button>
              </div>
            </div>
            <button type="submit" className="cta" disabled={loading}>
              {loading
                ? <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin .8s linear infinite" }}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>Signing in...</>
                : <>Sign In <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg></>
              }
            </button>
          </form>
          <div className="trust-row">
            <span className="tdot" />
            <span className="ttxt">Protected by 256-bit SSL encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}
