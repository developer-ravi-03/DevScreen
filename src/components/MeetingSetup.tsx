import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { CameraIcon, MicIcon, SettingsIcon } from "lucide-react";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";

function MeetingSetup({ onSetupComplete }: { onSetupComplete: () => void }) {
  const [isCameraDisabled, setIsCameraDisabled] = useState(true);
  const [isMicDisabled, setIsMicDisabled] = useState(false);

  const call = useCall();

  if (!call) return null;

  useEffect(() => {
    if (isCameraDisabled) call.camera.disable();
    else call.camera.enable();
  }, [isCameraDisabled, call.camera]);

  useEffect(() => {
    if (isMicDisabled) call.microphone.disable();
    else call.microphone.enable();
  }, [isMicDisabled, call.microphone]);

  const handleJoin = async () => {
    await call.join();
    onSetupComplete();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background/95 p-4 sm:p-6">
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* VIDEO PREVIEW CONTAINER */}
          <Card className="md:col-span-1 p-5 sm:p-6 flex flex-col">
            <div>
              <h1 className="text-xl font-semibold mb-1">Camera Preview</h1>
              <p className="text-sm text-muted-foreground">
                Make sure you look good!
              </p>
            </div>

            {/* VIDEO PREVIEW */}
            <div className="mt-4 flex-1 min-h-[360px] rounded-2xl overflow-hidden bg-background/70 border border-white/10 relative">
              <div className="absolute inset-0">
                <VideoPreview className="h-full w-full" />
              </div>
            </div>
          </Card>

          {/* CARD CONTROLS */}

          <Card className="p-5 sm:p-6 md:p-8 bg-white/[0.025] backdrop-blur-xl border-white/10 shadow-2xl">
            <div className="h-full flex flex-col">
              {/* MEETING DETAILS */}
              <div className="flex items-center gap-4 mb-8">
                <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-400 to-blue-600 shadow-lg shadow-indigo-500/20">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                    Meeting Details
                  </h2>
                  <p className="text-xs text-muted-foreground font-mono bg-black/20 px-3 py-2 rounded-xl border border-white/10 break-all">
                    {call.id}
                  </p>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* CAMERA CONTROL */}
                  <div className="flex items-center justify-between p-4 md:p-5 rounded-2xl border border-indigo-300/10 bg-indigo-500/[0.05]">
                    <div className="flex items-center gap-4">
                      <div className="grid size-12 place-items-center rounded-xl bg-indigo-400/10 text-indigo-200">
                        <CameraIcon className="h-6 w-6 text-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-foreground">
                          Camera
                        </p>
                        <p className="text-sm text-slate-600 dark:text-muted-foreground">
                          {isCameraDisabled ? "Disabled" : "Enabled"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={!isCameraDisabled}
                      onCheckedChange={(checked) =>
                        setIsCameraDisabled(!checked)
                      }
                    />
                  </div>

                  {/* MICROPHONE CONTROL */}
                  <div className="flex items-center justify-between p-4 md:p-5 rounded-2xl border border-blue-300/10 bg-blue-500/[0.05]">
                    <div className="flex items-center gap-4">
                      <div className="grid size-12 place-items-center rounded-xl bg-blue-400/10 text-blue-200">
                        <MicIcon className="h-6 w-6 text-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-foreground">
                          Microphone
                        </p>
                        <p className="text-sm text-slate-600 dark:text-muted-foreground">
                          {isMicDisabled ? "Muted" : "Active"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={!isMicDisabled}
                      onCheckedChange={(checked) => setIsMicDisabled(!checked)}
                    />
                  </div>

                  {/* DEVICE SETTINGS */}
                  <div className="flex items-center justify-between p-4 md:p-5 rounded-2xl border border-violet-300/10 bg-violet-500/[0.05]">
                    <div className="flex items-center gap-4">
                      <div className="grid size-12 place-items-center rounded-xl bg-violet-400/10 text-violet-200">
                        <SettingsIcon className="h-6 w-6 text-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-foreground">
                          Settings
                        </p>
                        <p className="text-sm text-slate-600 dark:text-muted-foreground">
                          Configure devices
                        </p>
                      </div>
                    </div>
                    <DeviceSettings />
                  </div>
                </div>

                {/* JOIN BUTTON */}
                <div className="space-y-4 mt-8">
                  <Button
                    className="w-full h-12 md:h-14 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-400 hover:to-blue-400 text-foreground font-semibold text-base md:text-lg shadow-lg shadow-indigo-500/20 rounded-xl border-0"
                    onClick={handleJoin}
                  >
                    Join Meeting
                  </Button>
                  <div className="text-center">
                    <p className="text-xs md:text-sm text-slate-600 dark:text-muted-foreground px-4">
                      Do not worry, our team is super friendly! We want you to
                      succeed. 🎉
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
export default MeetingSetup;
