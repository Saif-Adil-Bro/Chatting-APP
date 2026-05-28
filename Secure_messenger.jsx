Secure Messenger Component (Updated)
The code below contains the updated React component for SecureChat. The Google Font import has been optimized, and the code is structured cleanly for use in your project.
import { useState, useRef, useEffect } from "react";

const CONTACTS = [
  { id: 1, name: "রাফি আহমেদ", avatar: "RA", status: "online", lastSeen: "এখন", color: "#00e5ff" },
  { id: 2, name: "সাবরিনা ইসলাম", avatar: "SI", status: "online", lastSeen: "এখন", color: "#ff4081" },
  { id: 3, name: "তানভীর হোসেন", avatar: "TH", status: "offline", lastSeen: "৩০ মিনিট আগে", color: "#76ff03" },
  { id: 4, name: "নাফিসা রহমান", avatar: "NR", status: "offline", lastSeen: "২ ঘণ্টা আগে", color: "#ffab40" },
];

const INITIAL_MESSAGES = {
  1: [
    { id: 1, text: "হ্যালো! কেমন আছো?", sent: false, time: "১০:০০", encrypted: true },
    { id: 2, text: "ভালো আছি, তুমি কেমন?", sent: true, time: "১০:০২", encrypted: true },
    { id: 3, text: "এই অ্যাপটা দারুণ! সব মেসেজ এনক্রিপ্টেড 🔒", sent: false, time: "১০:০৫", encrypted: true },
  ],
  2: [
    { id: 1, text: "আজকের মিটিং কয়টায়?", sent: false, time: "০৯:৩০", encrypted: true },
    { id: 2, text: "বিকাল ৩টায়।", sent: true, time: "০৯:৩২", encrypted: true },
  ],
  3: [],
  4: [
    { id: 1, text: "প্রজেক্টের আপডেট পাঠাও", sent: true, time: "গতকাল", encrypted: true },
  ],
};

function LockIcon() {
  return (
    <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
      <rect x="1" y="5" width="8" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M2.5 5V3.5a2.5 2.5 0 015 0V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="5" cy="8.5" r="1" fill="currentColor"/>
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
      <path d="M8 1L2 3.5V8c0 3.5 2.5 6.5 6 7.5 3.5-1 6-4 6-7.5V3.5L8 1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M5 9l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M16 2L8 10M16 2L11 16L8 10M16 2L2 7L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M12 15L7 10L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function SecureMessenger() {
  const [activeContact, setActiveContact] = useState(null);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [showEncryptAnim, setShowEncryptAnim] = useState(false);
  const [search, setSearch] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeContact]);

  const sendMessage = () => {
    if (!input.trim() || !activeContact) return;
    const newMsg = {
      id: Date.now(),
      text: input.trim(),
      sent: true,
      time: new Date().toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit" }),
      encrypted: true,
    };
    setMessages(prev => ({
      ...prev,
      [activeContact.id]: [...(prev[activeContact.id] || []), newMsg],
    }));
    setInput("");
    setShowEncryptAnim(true);
    setTimeout(() => setShowEncryptAnim(false), 1200);
  };

  const filtered = CONTACTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const currentMessages = activeContact ? messages[activeContact.id] || [] : [];

  return (
    <div style={{
      fontFamily: "'Noto Sans Bengali', 'Segoe UI', sans-serif",
      height: "100vh",
      background: "#060a10",
      display: "flex",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        zIndex: 0,
      }}/>

      {/* Sidebar */}
      <div style={{
        width: activeContact ? "0" : "100%",
        maxWidth: "380px",
        background: "rgba(8,14,24,0.97)",
        borderRight: "1px solid rgba(0,229,255,0.1)",
        display: "flex",
        flexDirection: "column",
        zIndex: 1,
        transition: "width 0.3s",
        overflow: "hidden",
        flexShrink: 0,
      }}
      className="sidebar"
      >
        {/* Header */}
        <div style={{
          padding: "20px 20px 16px",
          borderBottom: "1px solid rgba(0,229,255,0.08)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ color: "#00e5ff" }}><ShieldIcon /></div>
            <span style={{ color: "#00e5ff", fontSize: 18, fontWeight: 700, letterSpacing: 1 }}>SecureChat</span>
            <div style={{
              marginLeft: "auto",
              background: "rgba(0,229,255,0.08)",
              border: "1px solid rgba(0,229,255,0.2)",
              borderRadius: 6,
              padding: "3px 8px",
              fontSize: 9,
              color: "#00e5ff",
              letterSpacing: 1,
            }}>E2E ENCRYPTED</div>
          </div>
          <input
            placeholder="🔍  যোগাযোগ খুঁজুন..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%",
              background: "rgba(0,229,255,0.05)",
              border: "1px solid rgba(0,229,255,0.12)",
              borderRadius: 10,
              padding: "9px 14px",
              color: "#b0c4d8",
              fontSize: 13,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Contact List */}
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
          {filtered.map(contact => {
            const lastMsg = messages[contact.id]?.slice(-1)[0];
            return (
              <div
                key={contact.id}
                onClick={() => setActiveContact(contact)}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 20px",
                  cursor: "pointer",
                  borderBottom: "1px solid rgba(255,255,255,0.03)",
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(0,229,255,0.05)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <div style={{ position: "relative" }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: `${contact.color}20`,
                    border: `2px solid ${contact.color}40`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: contact.color, fontWeight: 700, fontSize: 13,
                  }}>
                    {contact.avatar}
                  </div>
                  <div style={{
                    position: "absolute", bottom: 1, right: 1,
                    width: 10, height: 10, borderRadius: "50%",
                    background: contact.status === "online" ? "#00e676" : "#546e7a",
                    border: "2px solid #060a10",
                  }}/>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#dce9f5", fontWeight: 600, fontSize: 14 }}>{contact.name}</span>
                    <span style={{ color: "#546e7a", fontSize: 11 }}>{lastMsg?.time || ""}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                    <span style={{ color: "#00e5ff", opacity: 0.5 }}><LockIcon /></span>
                    <span style={{
                      color: "#546e7a", fontSize: 12,
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                      {lastMsg ? lastMsg.text : "কোনো মেসেজ নেই"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        

        {/* Footer badge */}
        <div style={{
          padding: "12px 20px",
          borderTop: "1px solid rgba(0,229,255,0.08)",
          display: "flex", alignItems: "center", gap: 8,
          color: "#2e4a5a", fontSize: 11,
        }}>
          <LockIcon />
          সকল মেসেজ এন্ড-টু-এন্ড এনক্রিপ্টেড
        </div>
      

      {/* Chat Panel */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        zIndex: 1,
        position: "relative",
        minWidth: 0,
      }}>
        {!activeContact ? (
          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            color: "#1e3040",
          }}>
            <div style={{ fontSize: 60, marginBottom: 16, opacity: 0.4 }}>🔒</div>
            <div style={{ fontSize: 16, color: "#2e4a5a" }}>একটি চ্যাট নির্বাচন করুন</div>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div style={{
              background: "rgba(8,14,24,0.98)",
              borderBottom: "1px solid rgba(0,229,255,0.08)",
              padding: "14px 20px",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <button
                onClick={() => setActiveContact(null)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "#00e5ff", padding: 4, display: "flex",
                }}
              >
                <BackIcon />
              </button>
              <div style={{ position: "relative" }}>
                <div style={{
                  width: 38, height: 38, borderRadius: "50%",
                  background: `${activeContact.color}20`,
                  border: `2px solid ${activeContact.color}50`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: activeContact.color, fontWeight: 700, fontSize: 12,
                }}>
                  {activeContact.avatar}
                </div>
                <div style={{
                  position: "absolute", bottom: 1, right: 1,
                  width: 9, height: 9, borderRadius: "50%",
                  background: activeContact.status === "online" ? "#00e676" : "#546e7a",
                  border: "2px solid #060a10",
                }}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#dce9f5", fontWeight: 600, fontSize: 15 }}>{activeContact.name}</div>
                <div style={{ color: activeContact.status === "online" ? "#00e676" : "#546e7a", fontSize: 11, marginTop: 1 }}>
                  {activeContact.status === "online" ? "● অনলাইন" : `শেষ দেখা ${activeContact.lastSeen}`}
                
              </div>
              <div style={{
                background: "rgba(0,229,255,0.06)",
                border: "1px solid rgba(0,229,255,0.15)",
                borderRadius: 8, padding: "4px 10px",
                color: "#00e5ff", fontSize: 10, letterSpacing: 1,
                display: "flex", alignItems: "center", gap: 5,
              }}>
                <LockIcon /> এনক্রিপ্টেড
              </div>
            </div>

            {/* Encrypt animation bar */}
            {showEncryptAnim && (
              <div style={{
                background: "rgba(0,229,255,0.08)",
                borderBottom: "1px solid rgba(0,229,255,0.15)",
                padding: "6px 20px",
                color: "#00e5ff", fontSize: 11,
                display: "flex", alignItems: "center", gap: 8,
                animation: "fadeIn 0.3s ease",
              }}>
                <span style={{ animation: "spin 0.8s linear infinite", display: "inline-block" }}>🔐</span>
                মেসেজ এনক্রিপ্ট হচ্ছে...
              </div>
            )}

            {/* Messages */}
            <div style={{
              flex: 1, overflowY: "auto",
              padding: "20px 16px",
              display: "flex", flexDirection: "column", gap: 10,
            }}>
              {currentMessages.length === 0 && (
                <div style={{
                  flex: 1, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  color: "#1e3040", gap: 8, marginTop: 40,
                }}>
                  <div style={{ fontSize: 32 }}>🔒</div>
                  <div style={{ fontSize: 13 }}>কথোপকথন শুরু করুন</div>
                  <div style={{ fontSize: 11, color: "#1a2a35" }}>সব মেসেজ এন্ড-টু-এন্ড এনক্রিপ্টেড</div>
                </div>
              )}
              {currentMessages.map((msg, i) => (
                <div key={msg.id} style={{
                  display: "flex",
                  justifyContent: msg.sent ? "flex-end" : "flex-start",
                  animation: `slideUp 0.2s ease ${i * 0.03}s both`,
                }}>
                  <div style={{
                    maxWidth: "75%",
                    background: msg.sent
                      ? "linear-gradient(135deg, #004d61, #006778)"
                      : "rgba(255,255,255,0.05)",
                    border: msg.sent
                      ? "1px solid rgba(0,229,255,0.2)"
                      : "1px solid rgba(255,255,255,0.06)",
                    borderRadius: msg.sent ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    padding: "10px 14px",
                  }}>
                    <div style={{ color: "#dce9f5", fontSize: 14, lineHeight: 1.5 }}>{msg.text}</div>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 4,
                      marginTop: 4, justifyContent: "flex-end",
                    }}>
                      <span style={{ color: "#00e5ff", opacity: 0.5, fontSize: 9 }}><LockIcon /></span>
                      <span style={{ color: "#546e7a", fontSize: 10 }}>{msg.time}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{
              background: "rgba(8,14,24,0.98)",
              borderTop: "1px solid rgba(0,229,255,0.08)",
              padding: "14px 16px",
              display: "flex", gap: 10, alignItems: "center",
            }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder="মেসেজ লিখুন..."
                style={{
                  flex: 1,
                  background: "rgba(0,229,255,0.05)",
                  border: "1px solid rgba(0,229,255,0.12)",
                  borderRadius: 12,
                  padding: "11px 16px",
                  color: "#dce9f5",
                  fontSize: 14,
                  outline: "none",
                }}
              />
              <button
                onClick={sendMessage}
                style={{
                  width: 44, height: 44,
                  borderRadius: 12,
                  background: input.trim()
                    ? "linear-gradient(135deg, #00b8d4, #00e5ff)"
                    : "rgba(0,229,255,0.05)",
                  border: "1px solid rgba(0,229,255,0.2)",
                  cursor: input.trim() ? "pointer" : "default",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: input.trim() ? "#060a10" : "#1e3040",
                  transition: "all 0.2s",
                  flexShrink: 0,
                }}
              >
                <SendIcon />
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,229,255,0.15); border-radius: 2px; }
        input::placeholder { color: #2e4a5a; }
        @media (min-width: 600px) {
          .sidebar { width: 340px !important; }
        }
      `}</style>
    </div>
  );
}


Note for implementation: As recommended, please add the Google Font link tag inside your project's main HTML file (typically index.html) within the <head> tags:
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;600;700&display=swap" rel="stylesheet">
