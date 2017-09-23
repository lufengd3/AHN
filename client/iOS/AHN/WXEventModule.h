//
//  WXEventModule.h
//  AHN
//
//  Created by LuF on 23/09/2017.
//  Copyright © 2017 LuF. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <WeexSDK/WXEventModuleProtocol.h>
#import <WeexSDK/WXModuleProtocol.h>

@interface WXEventModule : NSObject <WXEventModuleProtocol, WXModuleProtocol>

@end
