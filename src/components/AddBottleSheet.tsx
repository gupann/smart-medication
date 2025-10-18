import { useState } from 'react';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerFooter } from './ui/drawer';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Pill, Clock, Wifi, Weight } from 'lucide-react';
import { Progress } from './ui/progress';

interface AddBottleSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddBottleSheet({ open, onOpenChange }: AddBottleSheetProps) {
  const [step, setStep] = useState(1);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationProgress, setCalibrationProgress] = useState(0);

  const handleNext = () => {
    if (step === 2) {
      // Start calibration
      setIsCalibrating(true);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setCalibrationProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setIsCalibrating(false);
          setStep(3);
        }
      }, 300);
    } else {
      setStep(step + 1);
    }
  };

  const handleClose = () => {
    setStep(1);
    setIsCalibrating(false);
    setCalibrationProgress(0);
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={handleClose}>
      <DrawerContent className="max-h-[90vh]">
        <div className="overflow-auto px-4">
          <DrawerHeader>
            <DrawerTitle>
              {step === 1 && 'Connect Smart Bottle'}
              {step === 2 && 'Calibrate Pill Weight'}
              {step === 3 && 'Configure Medication'}
              {step === 4 && 'Setup Complete!'}
            </DrawerTitle>
            <DrawerDescription>
              {step === 1 && 'Pair your smart pill bottle with the app'}
              {step === 2 && 'Let\'s measure the weight of a single pill'}
              {step === 3 && 'Set up your medication schedule'}
              {step === 4 && 'Your smart bottle is ready to use'}
            </DrawerDescription>
          </DrawerHeader>

          {/* Step 1: Connect Bottle */}
          {step === 1 && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-center py-6">
                <div className="relative">
                  <div className="size-20 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                    <Wifi className="size-10 text-blue-600 animate-pulse" />
                  </div>
                  <div className="absolute -top-1 -right-1">
                    <div className="size-7 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="size-2.5 bg-white rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-sm">Searching for nearby bottles...</p>
                <Badge className="bg-green-500 hover:bg-green-600">
                  MediTrack Bottle #A7F2 Found
                </Badge>
              </div>

              <div className="p-3 bg-muted rounded-lg space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Device ID:</span>
                  <span className="font-mono text-xs">MT-A7F2-8K3P</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Battery:</span>
                  <span>100%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Firmware:</span>
                  <span>v2.1.4</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Calibration */}
          {step === 2 && (
            <div className="space-y-4 py-4">
              {!isCalibrating ? (
                <>
                  <div className="flex items-center justify-center py-4">
                    <div className="size-24 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                      <Weight className="size-12 text-purple-600" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                      <h4 className="text-sm mb-2">Calibration Instructions</h4>
                      <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                        <li>Empty the bottle completely</li>
                        <li>Place ONE pill in the bottle</li>
                        <li>Wait for the weight to stabilize</li>
                        <li>Click "Start Calibration"</li>
                      </ol>
                    </div>

                    <p className="text-xs text-muted-foreground text-center">
                      This helps us accurately count pills by weight
                    </p>
                  </div>
                </>
              ) : (
                <div className="space-y-4 py-4">
                  <div className="flex items-center justify-center">
                    <div className="size-24 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                      <Weight className="size-12 text-purple-600 animate-pulse" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Calibrating...</span>
                      <span>{calibrationProgress}%</span>
                    </div>
                    <Progress value={calibrationProgress} className="h-2" />
                  </div>

                  <p className="text-sm text-muted-foreground text-center">
                    Measuring pill weight...
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Configure Medication */}
          {step === 3 && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="medName">Medication Name</Label>
                <Input id="medName" placeholder="e.g., Lisinopril 10mg" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dosage">Dosage Amount</Label>
                <Select defaultValue="1">
                  <SelectTrigger id="dosage">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 pill</SelectItem>
                    <SelectItem value="2">2 pills</SelectItem>
                    <SelectItem value="3">3 pills</SelectItem>
                    <SelectItem value="custom">Custom amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="frequency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Once daily</SelectItem>
                    <SelectItem value="twice">Twice daily</SelectItem>
                    <SelectItem value="three">Three times daily</SelectItem>
                    <SelectItem value="custom">Custom schedule</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Dose Time</Label>
                <Input id="time" type="time" defaultValue="08:00" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pillCount">Initial Pill Count</Label>
                <Input id="pillCount" type="number" placeholder="30" />
                <p className="text-xs text-muted-foreground">
                  Add all your pills to the bottle after calibration
                </p>
              </div>

              <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                <p className="text-xs text-green-900 dark:text-green-100">
                  ✓ Pill weight calibrated: 0.24g per pill
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Complete */}
          {step === 4 && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-center">
                <div className="size-16 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center">
                  <svg className="size-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <div className="text-center space-y-1.5">
                <h3>All Set!</h3>
                <p className="text-sm text-muted-foreground">
                  Your smart bottle is configured and ready to track your medication
                </p>
              </div>

              <div className="p-3 bg-muted rounded-lg space-y-3">
                <div className="flex items-center gap-3">
                  <Pill className="size-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm">Lisinopril 10mg</p>
                    <p className="text-xs text-muted-foreground">1 pill per dose</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="size-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm">Daily at 8:00 AM</p>
                    <p className="text-xs text-muted-foreground">Reminders enabled</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DrawerFooter className="px-0 pb-6">
            {step === 4 ? (
              <Button onClick={handleClose} className="w-full">
                Done
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleClose} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleNext} disabled={isCalibrating} className="flex-1">
                  {step === 2 && !isCalibrating ? 'Start Calibration' : 'Next'}
                </Button>
              </div>
            )}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
