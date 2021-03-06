/*
*  Nokia Data Gathering
*
*  Copyright (C) 2011 Nokia Corporation
*
*  This program is free software; you can redistribute it and/or
*  modify it under the terms of the GNU Lesser General Public
*  License as published by the Free Software Foundation; either
*  version 2.1 of the License, or (at your option) any later version.
*
*  This program is distributed in the hope that it will be useful,
*  but WITHOUT ANY WARRANTY; without even the implied warranty of
*  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
*  Lesser General Public License for more details.
*
*  You should have received a copy of the GNU Lesser General Public License
*  along with this program.  If not, see <http://www.gnu.org/licenses/
*/

package controllers.sms;

import controllers.util.PropertiesUtil;
import java.util.Properties;

public class SmsHandlerFactory {

    private SMSModemHandler smsHandler = null;

    private static SmsHandlerFactory instance = null;

    public static SmsHandlerFactory getInstance() {
        if (instance == null) {
            synchronized (SmsHandlerFactory.class) {
                if (instance == null) {
                    instance = new SmsHandlerFactory();
                }
            }
        }
        return instance;
    }

    public SMSModemHandler getSmsHandler() {
        Properties properties = PropertiesUtil.getCoreProperties();
        if(smsHandler == null) {
            if ( hasSmsSupport() ) {
                smsHandler = SMSModemHandler.getInstance();
            }
        }
        return smsHandler;
    }

    public static boolean hasSmsSupport(){
        boolean result = false;
        Properties properties = PropertiesUtil.getCoreProperties();
        String pp = properties.getProperty("SMS_SUPPORT");
        if (pp != null && pp.equalsIgnoreCase("true")){
            result = true;
        }
        return result;
    }
}
